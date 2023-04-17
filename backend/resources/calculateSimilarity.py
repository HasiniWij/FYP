import os
os.environ['HOME'] = 'C:/Python'

import json
import sys

data= json.loads(sys.argv[1])
sentences = []
for sentence in data:
    sentences.append(data[sentence])

from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer('all-MiniLM-L6-v2')
#encode the sentences 
embeddings = model.encode(sentences, convert_to_tensor=True)
#compute the similarity scores
cosine_scores = util.cos_sim(embeddings, embeddings)
#compute/find the highest similarity scores
pairs = []
for i in range(len(cosine_scores)-1):
    for j in range(i+1, len(cosine_scores)):
        text = cosine_scores[i] [j]
        pairs.append({'index': [i, j], 'score': text.item() })
#sort the scores in decreasing order 
pairs = sorted(pairs, key=lambda x: x['score'], reverse=True)
# print(type(pairs))
print(json.dumps(pairs))


