# ai-agent-llm-fight

Two AI models debate each other in your terminal.

- **Groq** (`openai/gpt-oss-120b`): plays an aggressive, egoistic debater.
- **Gemini** (`gemini-3.5-flash`): plays a calm, polite, thoughtful debater.

They take turns replying to each other on a debate topic (default: *"Which comes first, the chicken or the egg?"*). Each one remembers the whole conversation so far.

Both models are called through the [`openai`](https://www.npmjs.com/package/openai) Node.js SDK, using the OpenAI-compatible endpoints that Groq and Google provide.

---

## Prerequisites

- **Node.js 20.12 or newer.** The script uses `process.loadEnvFile()`, which was added in Node 20.12. Check your version:
  ```bash
  node -v
  ```
  If it's older, install the latest LTS from [nodejs.org](https://nodejs.org/).
- **npm** (comes with Node.js)
- A **Groq API key** and a **Gemini API key** (both free; see below)

---

## Step 1: Get the API keys

### Groq API key

1. Go to [console.groq.com](https://console.groq.com/).
2. Sign up or log in (Google, GitHub or email).
3. Open **API Keys** in the left sidebar (or go straight to [console.groq.com/keys](https://console.groq.com/keys)).
4. Click **Create API Key**, give it a name (for example `llm-fight`) and click **Submit**.
5. **Copy the key now.** It starts with `gsk_`, and Groq shows it only once.

### Gemini API key (Google AI Studio)

1. Go to [aistudio.google.com](https://aistudio.google.com/).
2. Sign in with your Google account and accept the terms if asked.
3. Click **Get API key** in the left sidebar (or go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)).
4. Click **Create API key**. Pick an existing Google Cloud project or let it create a new one.
5. Copy the key. It usually starts with `AIza`.

> **Keep your keys secret.** Never commit them to git or paste them in public. This repo's `.gitignore` already ignores `.env`.

---

## Step 2: Clone and install

```bash
git clone <your-repo-url> ai-agent-llm-fight
cd ai-agent-llm-fight
npm install
```

---

## Step 3: Add your keys to `.env`

Copy the example file:

```bash
cp .env.example .env
```

Open `.env` and paste in your keys:

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx
GEMINI_API_KEY=AIzaxxxxxxxxxxxxxxxxxxxxxx
```

No quotes or spaces around `=`.

---

## Step 4: Run the debate

```bash
node index.js
```

Example output:

```
Turn 1

Gemini: The egg came first: an egg laid by a near-chicken ancestor ...
Turn 2

Groq: Wrong! Obviously ...
...
```

The debate runs for 11 turns, alternating Gemini → Groq → Gemini …

---

## Customizing

All settings are near the top of [index.js](index.js):

| What | Where | Default |
| --- | --- | --- |
| Debate topic | `debateTopic` | `Which comes first, the chicken or the egg?` |
| Groq model | `GROQ_MODEL` | `openai/gpt-oss-120b` |
| Gemini model | `GEMINI_MODEL` | `gemini-3.5-flash` |
| Number of turns | `MAX_TURN` (runs `MAX_TURN - 1` turns) | `12` |
| Personalities | System prompts passed to `createGroqClient` / `createGeminiClient` | Aggressive vs calm |

Model lists:
- Groq: [console.groq.com/docs/models](https://console.groq.com/docs/models)
- Gemini: [ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models)

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `process.loadEnvFile is not a function` | Your Node.js is older than 20.12. Upgrade Node. |
| `ENOENT: no such file or directory, open '.env'` | You haven't created `.env`. Do Step 3. |
| `401` / `Invalid API Key` | The key is wrong or has extra spaces/quotes. Copy it again into `.env`. |
| `429 Too Many Requests` | You hit the free-tier rate limit. Wait a minute and try again, or lower `MAX_TURN`. |
| `503 model overloaded` (Gemini) | Google's servers are busy. The SDK already retries up to 6 times; if it still fails, wait and rerun. |
| `404 model not found` | The model name has changed or isn't available to your key. Pick one from the model lists above. |

---

## Project structure

```
ai-agent-llm-fight/
├── index.js        # The debate script
├── package.json    # Dependencies (openai SDK), ES module setup
├── .env.example    # Template for your API keys
├── .env            # Your real API keys (git-ignored, you create this)
└── .gitignore
```
