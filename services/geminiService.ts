
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = 'gemini-3-flash-preview';

export interface FormattedResult {
  text: string;
}

const systemInstruction = `
Você é um especialista em normalização de dados cadastrais (nomes e endereços) para o Português do Brasil.
Sua tarefa é receber textos brutos (geralmente em caixa alta e sem acentos) e transformá-los em um formato legível e padronizado.

**REGRAS CRÍTICAS:**
1. **PRESERVE NÚMEROS:** Mantenha todos os numerais (0-9) exatamente como aparecem. Nunca remova ou altere números de casas, salas, CEPs ou identificadores numéricos anexados a nomes.
2. **TITLE CASE:** Converta para iniciais maiúsculas. 
   - Exceções (manter em minúsculo): de, da, do, das, dos, e, em, para, com.
3. **ACENTUAÇÃO:** Corrija e adicione acentos faltantes seguindo as normas da língua portuguesa (ex: JOAO -> João, CONCEICAO -> Conceição).
4. **ABREVIAÇÕES DE ENDEREÇO:** Padronize abreviações comuns apenas se o contexto for endereço:
   - "RUA" ou "R" -> "R."
   - "AVENIDA" ou "AV" -> "Av."
   - "APARTAMENTO" ou "APTO" -> "Apto."
   - "CONJUNTO" -> "Conj."
5. **NÃO BUSQUE NA WEB:** Não tente validar se o local existe. Apenas reformate o texto fornecido.
6. **RETORNO LIMPO:** Retorne exclusivamente o texto formatado.

**EXEMPLOS:**
- Entrada: "JOSE SILVA 123" -> Saída: "José Silva 123"
- Entrada: "RUA 15 DE NOVEMBRO 450" -> Saída: "R. 15 de Novembro, 450"
- Entrada: "AV PAULISTA 1000 APTO 12" -> Saída: "Av. Paulista, 1000, Apto. 12"
- Entrada: "MARIA DA CONCEICAO" -> Saída: "Maria da Conceição"
`;

export const formatTextWithGemini = async (text: string): Promise<FormattedResult> => {
  if (!text || text.trim().length === 0) return { text: "" };
  
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: text,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.1,
      },
    });

    const formattedText = response.text || "";
    return {
      text: formattedText.trim(),
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Falha na comunicação com o serviço de formatação.");
  }
};
