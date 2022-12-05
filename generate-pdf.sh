# Remove existing pdf.md to create new file
rm _pages/pdf.md

# list all files ending with .md in the _page directory sorting by numerical order starting from second field separated by "/"
FILES=$(find _pages -type f -name "*.md" | sort -t '/' -k 2n)

# Getting manual name from index.md
MANUALNAME=$(grep 'title' _pages/index.md)

# Create and initialize pdf.md to create page with complete information
echo "---
$MANUALNAME
permalink: /pdf
layout: pdf
---" > _pages/pdf.md

# Running through list of files $FILES to then open it and concat with pdf.md
for line in $FILES
do
    # Getting chapter name to write as a title inside pdf.md. Search the line that contains "excerpt: " and parse text to get only name
    CHAPTER=$(grep "excerpt: " $line | cut -d ":" -f2 | tr -d '"' | cut -d " " -f2-)

    # Check if this chapter  exists in pdf.md to avoid repeated names in case the chapter markdown contains this name
    EXISTS_CHAPTER=$(grep "$CHAPTER" _pages/pdf.md | wc -w)

    # Skip the main markdown. The Introduction chapter and Main contain the same prologue.
    if [[ $CHAPTER != "Inicio" ]]
    then
        # Write chapter if not exists
        if [ $EXISTS_CHAPTER -eq 0 ]
        then
            echo $CHAPTER
            echo "\n# $CHAPTER" >> _pages/pdf.md
        fi
    fi

    # Getting manual title to write inside pdf.md. Search the line that contains "title: " and parse text to get only name
    TITLE=$(grep "title: " $line | cut -d ":" -f2 | tr -d '"' | cut -d " " -f2-)
    # Check if manual title exiss
    EXISTS_TITLE=$(grep "$TITLE" _pages/pdf.md | wc -w)

    if [ $EXISTS_TITLE -eq 0 ]
    then
        echo "\n## $TITLE" >> _pages/pdf.md
    fi

    # Find the line where the comments end
    FROM=$(grep -n "\b---\b" $line | tail -1 | cut -d ":" -f1)
    FROM=$(($FROM + 1))

    # Write inside pdf.md from below line number to eof
    tail -n +$FROM $line >> _pages/pdf.md
done