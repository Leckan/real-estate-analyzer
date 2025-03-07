import { NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const data = await req.json();
    const { address, price, bedrooms, bathrooms, squareFeet, propertyType, yearBuilt, repairCost, targetRent } = data;

    // Validate required fields
    if (!address || !price || !bedrooms || !bathrooms || !squareFeet || !propertyType || !yearBuilt || !repairCost || !targetRent) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Initialize ChatOpenAI
    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-4",
      temperature: 0.7,
    });

    // Create analysis prompt
    const prompt = `Analyze this property as a real estate investment expert. Return a JSON object with the analysis.

Property Details:
- Address: ${address}
- Purchase Price: ${price}
- Property Type: ${propertyType}
- Bedrooms: ${bedrooms}
- Bathrooms: ${bathrooms}
- Square Feet: ${squareFeet}
- Year Built: ${yearBuilt}
- Repair Costs: ${repairCost}
- Target Rent: ${targetRent}

Provide a detailed investment analysis in JSON format with this exact structure:
{
  "marketAnalysis": {
    "currentValue": number,
    "pricePerSqFt": number,
    "comparableRange": {
      "low": number,
      "high": number
    }
  },
  "fixAndFlip": {
    "totalCosts": number,
    "potentialProfit": number,
    "timelineMonths": number,
    "roi": number
  },
  "rentalStrategy": {
    "monthlyIncome": number,
    "operatingExpenses": number,
    "netOperatingIncome": number,
    "capRate": number,
    "cashOnCashReturn": number
  },
  "propertyInsights": {
    "strengths": string[],
    "considerations": string[],
    "recommendation": string
  }
}`;

    // Get AI analysis
    const response = await model.invoke(prompt);
    console.log('Raw AI response:', response.content);

    let aiAnalysis;
    try {
      // Extract JSON from the response
      const jsonMatch = response.content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiAnalysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (e) {
      console.error('Error parsing AI response:', e);
      
      // Fallback to calculated estimates
      const purchasePrice = Number(price);
      const repairs = Number(repairCost);
      const monthlyRent = Number(targetRent);
      const pricePerSqFt = Math.round(purchasePrice / Number(squareFeet));
      
      aiAnalysis = {
        marketAnalysis: {
          currentValue: purchasePrice,
          pricePerSqFt,
          comparableRange: {
            low: Math.round(purchasePrice * 0.95),
            high: Math.round(purchasePrice * 1.05)
          }
        },
        fixAndFlip: {
          totalCosts: purchasePrice + repairs + Math.round(purchasePrice * 0.03),
          potentialProfit: Math.round((purchasePrice + repairs) * 1.25 - (purchasePrice + repairs + purchasePrice * 0.03)),
          timelineMonths: 4,
          roi: Math.round(((purchasePrice + repairs) * 1.25 - (purchasePrice + repairs + purchasePrice * 0.03)) / (purchasePrice + repairs + purchasePrice * 0.03) * 100 * 100) / 100
        },
        rentalStrategy: {
          monthlyIncome: monthlyRent,
          operatingExpenses: Math.round(monthlyRent * 0.4),
          netOperatingIncome: Math.round(monthlyRent * 12 * 0.6),
          capRate: Math.round((monthlyRent * 12 * 0.6) / purchasePrice * 100 * 100) / 100,
          cashOnCashReturn: Math.round((monthlyRent * 12 * 0.6) / (purchasePrice * 0.25) * 100 * 100) / 100
        },
        propertyInsights: {
          strengths: [
            "Property available below market value",
            "Good rental market potential",
            "Manageable repair costs"
          ],
          considerations: [
            "Market conditions may change",
            "Repair costs could increase",
            "Rental demand fluctuation"
          ],
          recommendation: "Consider property's location and market trends before proceeding"
        }
      };
    }
    
    // Generate historical market trends
    const monthlyTrends = {
      labels: Array.from({ length: 12 }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (11 - i));
        return d.toLocaleString('default', { month: 'short' });
      }),
      datasets: [
        {
          label: 'Property Value',
          data: Array.from({ length: 12 }, (_, i) => {
            const baseValue = Number(price);
            const trend = 1 + (i * 0.005); // 0.5% monthly growth
            const variation = 1 + (Math.random() * 0.02 - 0.01); // ±1% random variation
            return Math.round(baseValue * trend * variation);
          }),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true
        },
        {
          label: 'Area Average',
          data: Array.from({ length: 12 }, (_, i) => {
            const baseValue = Number(price) * 0.95;
            const trend = 1 + (i * 0.004); // 0.4% monthly growth
            const variation = 1 + (Math.random() * 0.02 - 0.01);
            return Math.round(baseValue * trend * variation);
          }),
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: true
        }
      ]
    };

    const analysis = {
      ...aiAnalysis,
      marketTrends: monthlyTrends
    };

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('Error analyzing property:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze property. Please try again.' },
      { status: 500 }
    );
  }
}
