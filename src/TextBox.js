// content object is expected to have both a title (string) and paragraphs (array of strings)
// TODO convert to typescript
const TextBox = ({content}) => {
    console.log("content.paragraphs is "+content.paragraphs[0])
    return (
        <div>
            <h1>{content.title}</h1>
            {
               content.paragraphs.map((paragraph) => <p>{paragraph}</p>) 
            }
        </div>
    )
}

export default TextBox
