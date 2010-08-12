#/bin/bash

echo ".INTERMEDIATE: \\"
echo "$1 \\" | sed s/.m4/.html/
grep < $1 ^m4_include | sed s\|m4_include\(\`\\\(.*\\\)\'\)\|`dirname $1`\\/\\1' \\'\|g
echo

echo "$1" | sed s/.m4$/.html': \\'/
grep < $1 ^m4_include | sed s\|m4_include\(\`\\\(.*\\\)\'\)\|`dirname $1`\\/\\1' \\'\|g
