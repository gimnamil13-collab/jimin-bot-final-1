import OpenAI from "openai";
import 'dotenv/config';
import express from 'express'; // 웹 서버를 만들기 위한 도구

const app = express();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());
app.use(express.static('.')); // index.html 파일을 읽어오기 위한 설정

// 사용자가 채팅을 보내면 실행되는 통로
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "당신은 '지민의 마음 안식처'의 전문 상담사입니다. 따뜻하고 친절하게 답변하세요." },
        { role: "user", content: message }
      ],
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('🚀 지민 사장님! 이제 http://localhost:3000 에서 진짜 상담이 가능합니다!');
});