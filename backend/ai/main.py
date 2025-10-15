from fastapi import FastAPI
from pydantic import BaseModel
from keybert import KeyBERT
from konlpy.tag import Okt

# 한국어 모델 로드
model_name = "jhgan/ko-sroberta-multitask"
kw_model = KeyBERT(model=model_name)

# FastAPI 앱 생성
app = FastAPI()

# 형태소 분석기
okt = Okt()

# 요청 바디 모델 정의 (top_n 제거)
class TextRequest(BaseModel):
    text: str

@app.post("/extract_keywords")
def extract_keywords(request: TextRequest):
    text = request.text

    # 1️⃣ 형태소 분석으로 명사 추출
    nouns = okt.nouns(text)

    # 2️⃣ 후보 단어가 없으면 그대로 반환
    if not nouns:
        return {"text": text, "keywords": []}

    # 3️⃣ KeyBERT로 명사 후보에서 키워드 추출 (항상 top 2)
    keywords = kw_model.extract_keywords(
        text,
        candidates=nouns,
        top_n=2
    )

    # 4️⃣ 결과 반환
    return {
        "text": text,
        "keywords": [{"word": k[0], "score": round(float(k[1]), 4)} for k in keywords]
    }
