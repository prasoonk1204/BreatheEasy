const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Gemini API key and endpoint
const GEMINI_API_KEY = 'AIzaSyAatHh04PTBB4wzgaL22VFEwtRb7kCrOLE';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=' + GEMINI_API_KEY;

app.post('/api/health-advice', async (req, res) => {
  const userData = req.body;

  // Calculate BMI if weight and height are provided
  let bmi = null;
  if (userData.weight && userData.height) {
    const heightInMeters = userData.height / 100;
    bmi = (userData.weight / (heightInMeters * heightInMeters)).toFixed(1);
  }

  // Enhanced prompt for Gemini
  const prompt = `As a health advisor, analyze the following user information and provide personalized health recommendations:

User Profile:
- Age: ${userData.age} years
- Gender: ${userData.gender}
- Weight: ${userData.weight} kg
- Height: ${userData.height} cm
${bmi ? `- BMI: ${bmi} (${bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'})` : ''}
- Known Conditions: ${userData.conditions || 'None specified'}
- Smoking Status: ${userData.smoking}
- Sleep Hours: ${userData.sleepHours} hours per night
- Physical Activity: ${userData.physicalActivity} hours per week

Please provide a comprehensive health assessment with the following sections. Use clear formatting without any special markers like ** or ##:

1. General Health Assessment
   - Overall health status based on provided information
   - Key health concerns to monitor

2. Lifestyle Recommendations
   - Sleep optimization advice
   - Physical activity suggestions
   - Smoking cessation guidance (if applicable)

3. Nutrition & Diet
   - Personalized dietary recommendations
   - Foods to include/avoid
   - Hydration advice

4. Exercise & Fitness
   - Suitable exercise types and intensity
   - Weekly activity recommendations
   - Safety precautions

5. Condition-Specific Advice
   - Recommendations for any mentioned health conditions
   - Preventive measures

6. Air Quality Considerations
   - How air quality might affect their specific health profile
   - Additional precautions for their conditions

Please format the response in a clear, easy-to-read structure with bullet points and sections. Be encouraging and actionable in your recommendations. Do not use any markdown formatting symbols like ** or ##.`;

  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    });
    const geminiReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No advice generated.';
    res.json({ advice: geminiReply });
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate health advice.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});