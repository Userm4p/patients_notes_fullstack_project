import { openai, envs } from '../config';

export const aiSummaryGenerator = async (note: string) => {
  const prompt = `Summarize the following patient note in a concise manner, highlighting key information such as symptoms, diagnosis, and treatment plan:\n\n${note}, in the response only return the summary without any additional text.`;
  const response = await openai.chat.completions.create({
    model: envs.summaryModel!,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return response.choices[0].message?.content || '';
};
