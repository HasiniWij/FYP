import os
os.environ['HOME'] = 'C:/Python'

import json
import sys
from operator import itemgetter
from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer('all-MiniLM-L6-v2')

data= json.loads(sys.argv[1])
#encode the sentences 
supervisorEmbeddings = model.encode(data['supervisorProjects'], convert_to_tensor=True)
studentEmbeddings = model.encode(data['studentProjects'], convert_to_tensor=True)
#compute the similarity scores
cosine_scores = util.cos_sim(supervisorEmbeddings, studentEmbeddings)
# Convert matrix to array
size = cosine_scores.size()
pairs = []
for supervisorIndex in range(size[0]):
    for studentIndex in range(size[1]):
        score = cosine_scores[supervisorIndex] [studentIndex]
        pairs.append({'index': [supervisorIndex, studentIndex], 'score': score.item() })
# sorting according to score
orderedScore = sorted(pairs, key=itemgetter('score'), reverse=True)
print(json.dumps(orderedScore))


