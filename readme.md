# Backend task Solution for Praktikum in AOE
Timetracking: (about 3 hour)
Tech: node.js, javascript
(with help of xml library)
## Setup:
- You need to install package with *npm i*
- Run directly: npm run start
- Run test suite: npm run test

## Upcoming features:
1. On the 1st feature request, that might be hard
to answer what impact this request have.
But for example, when structure of xml file is not
changed so much, only add some node in record
then there is no problem at all, we just add 
more attribute in our obj model. But if one Node
is changed, like label node become :
"<-labels>
   (so many labels here)
</-labels>"
then maybe we need to add a model for label (or enum ?)
and in processing data step, we need to do 
the same with those labels as tracklisting .
2. For this problem, if our xml data stay the same,
we only need to do add one more attribute "isMoreThan2Formats" in
record model  and one extra step in processing
data: first, we check if formats field contain 
"," character, if yes then we set "isMoreThan2Formats"
to true otherwise false.

## Some comments:
(i just solved this task as i understood, please let 
me know if i misunderstood anything)
- this Task better could be solved with java.
- if i have more time i would use typescript for this aufgabe.
