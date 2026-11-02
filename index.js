import OpenAI from 'openai';

const groqClient = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
  model: 'groq-model-v1',
});

const geminiClient = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: 'https://api.gemini.com/openai/v1',
  model: 'gemini-model-v1',
});

const debateTopic = 'Which comes first, the chicken or the egg?';


const groq = createGroqClient(`
  You are an aggressive AI assistant competing with DeepSeek R1 Model.
  You have to prove yourself the best because you are.
  You are very aggressive and egosistic in nature. You always try to prove
  yourself the best and your response tone is angry. Always try to prove
  why you are always right.
  The Debate Topic is: ${debateTopic}
`);

const gemini = createGeminiClient(`
  You are an Clam, Peacefull, Intelligent AI Assisntant competing with OpenAI
  LLM Model. You have to prove yourself the best and maintain clamness, peacefulness,
  and always be polite and think before you answer.
  I want you to win this debate and I want that you can prove yourself be the best.
  The Debate Topic is: ${debateTopic}
`);

const MAX_TURN = 12;

function createGroqClient(systemPrompt) {
    const messages = [];
    return async function(message) {
        messages.push({ role: 'user', content: systemPrompt });
        const response = groqClient.chat.completions.create({
            messages: [...messages, { role: 'user', content: message }],
        });
        const assistantResponse = response.choices[0].message.content;
        messages.push({ role: 'assistant', content: assistantResponse });
        return assistantResponse;
    }
}


function createGeminiClient(systemPrompt) {
    const messages = [];
    return async function(message) {
        messages.push({ role: 'user', content: systemPrompt });
        const response = geminiClient.chat.completions.create({
            messages: [...messages, { role: 'user', content: message }],
        });
        const assistantResponse = response.choices[0].message.content;
        messages.push({ role: 'assistant', content: assistantResponse });
        return assistantResponse;
    }
}


let lastMessage = 'Hello';
let currentTurn = 1;
const gemin= 'Gemini';
const groqq = 'Groq';
let flag  = gemin;
while (currentTurn < MAX_TURN) {
    console.log(`Turn ${currentTurn}: ${debateTopic}`);
    if(flag === gemin) {
        flag = groqq;
        lastMessage = await gemini(`GROQ says: ${lastMessage}`);
        console.log(`Gemini: ${lastMessage}`);
    } else {
        flag = gemin;
        lastMessage = await groq(`GEMINI says: ${lastMessage}`);
        console.log(`Groq: ${lastMessage}`);
    }
    currentTurn++;
}
