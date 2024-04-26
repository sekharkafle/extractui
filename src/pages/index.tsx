
/*import ChipInput from "@/components/ChipInput";*/
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";

// eslint-disable-next-line react/display-name
const ChipInput = forwardRef((props,ref) => {

  useImperativeHandle(ref, () =>(
    {
      getChipData(){
        return chips;
      }
    }
  ))
  const [text, setText] = useState("");
  const [chips, setChips] = useState([]);
  const [validationError, setValidationError] = useState("");

  function removeChip(chipToRemove) {
    // filtering out the chip that the user wants to remove
    const updatedChips = chips.filter((chip) => chip !== chipToRemove);
    setChips(updatedChips);
  }

  function handlePressEnter(e) {
    // don't submit the form if the user presses 'Enter'
    if (e.key === "Enter") e.preventDefault();
    // return if the user pressed a key that is not 'Enter', or the user hasn't typed anything
    if (e.key !== "Enter" || !text) return;
    // need to show error if the user tries to add the same input more than once
    if (chips.includes(text)) {
      return setValidationError("Cannot add the same input more than once");
    }
    // adding the input value to chips array
    setChips((prevState) => [...prevState, e.target.value]);
    // clearing the input box
    setText("");
    // clearing error message
    setValidationError("");
  }

  return (
    <div>
      <label htmlFor="tags">What do you want to extract?</label>
      <div className="input-container">
        <ul className="chips">
          {chips.map((chip) => (
            <li key={chip} className="chip">
              <span>{chip}</span>
              <TiDelete onClick={() => removeChip(chip)} tabIndex="0" />
            </li>
          ))}
        </ul>
        <input
          className="px-2
            font-size: 1.6rem;
            background: transparent;
            border: none;
            outline: none;"
          type="text"
          id="tags"
          placeholder="Press enter to add"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handlePressEnter}
        />
      </div>
      {validationError && <p className="error-message">{validationError}</p>}
    </div>
  );
}
)



export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState([]);
    const [text, setText] = useState("");
    const [fields, setFields] = useState([]);
    const elemRef = useRef()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFields(elemRef.current.getChipData());
    if (!text || fields.length === 0) return
    setIsLoading(true);
    setResult([]);
    try {
      const data = {extractMessage: {fields:fields, text:text}};
      const res = await fetch('https://f4wo0au9r5.execute-api.us-east-1.amazonaws.com/default/claude-chat', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())
      setIsLoading(false);
      const resJ = await res.json();
      const msg2 = JSON.stringify(resJ).replaceAll('"','');
      const msg3 = msg2.trim();
      const msg4 = msg3.split('\\n');
      setResult(msg4);
    } catch (e: any) {
      // Handle errors here
      console.error(e)
      setIsLoading(false);
    }
  }
    return (
        

<div className="relative flex flex-col justify-center text-center overflow-hidden">
      <div className="w-full p-6 m-auto">
        <h1 className="text-3xl font-semibold  text-indigo-700 underline uppercase">
          Extract Key Terms
        </h1>
        <form className="mt-6" onSubmit={onSubmit}>
            <div className="mb-6">
            <label className="text-left" htmlFor='1234'>Enter Text</label>
            <br/>
            <textarea id='1234' className="
            px-2"
                rows = {4} cols= {40} name="query"
                onChange={(e) => setText(e.target.value)}
            />
            
            </div>
            <div >
            <ChipInput ref={elemRef}/>
            </div>


           <div className="mt-6 mb-6">
            <button
              type="submit"
              className="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
            >
              <div role="status" className={`${isLoading ? "" : "hidden"} flex justify-center`}>
                    <svg aria-hidden="true" className="w-6 h-6 text-white animate-spin dark:text-white fill-sky-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
                <span className={isLoading ? "hidden" : ""}>Search</span>
            </button>
          </div>


          
          <div className="mb-2">
            
              <span className="text-indigo-700">Result</span>
              <hr
                style={{ borderTop: "1px solid lightgrey" }}
              ></hr>
              
              <div className="whitespace-pre-line flex flex-col">
                {
                    result.map((s, i) =>(
                        <span key={"aidata:" + i}>{s}</span>
                    ))
                }
                </div>

          </div>

        </form>
      </div>
        
        </div>
    );
  }