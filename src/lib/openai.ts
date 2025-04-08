export async function generateContentWithOpenAI(prompt: string) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Sen ilkokul çocuklarına matematik anlatan bir öğretmensin. Basit ve çocukların anlayacağı dilde konuları anlatıyorsun.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });
  
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API hatası:', error);
      throw new Error('İçerik oluşturulurken bir hata oluştu.');
    }
  }