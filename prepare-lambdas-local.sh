mkdir lambdas-zipped
cd lambdas
for d in */ ; do
./${d}build.sh $d
done
