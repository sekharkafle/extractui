### Demo UI App for LLM based extract application
The source code to build a basic extract application using GenAI or Large Language Model (LLM). 

Full sequence diagram of the extract application is shown below: 
![Extract Diagram](chat-arch.PNG)


This repo contains the frontend code built with React that consumes backend service in AWS Lambda exposed through API gateway.

It simply allows uploading the file and POST it to the service. Relevant code is shown below:  
```
    setIsLoading(true);
    setResult([]);
    try {
      const data = {extractMessage: {fields:fields, text:text}};
      const res = await fetch(serviceUrl, {
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
```

JSON input payload to the service is given below:
```
{"extractMessage":
   {
    "fields":["company name","demographic","annual income","business type"],
   "text":"I want to learn about ABC inc. selling ice cream for school aged children and making 1M monthly income"
   }
}
```
Output from the service will be as follows:

```
"Company name: ABC inc.\nDemographic: school aged children
\nAnnual income: 12000000\nBusiness type: selling ice cream"
```

The final UI will look something like this:
![Extract UI](chat-arch.PNG)


For complete details on the application, please check here: [http://kafles.com/2024/04/27/practical-llm3/](http://kafles.com/2024/04/27/practical-llm3/)

Happy Extracting!!!
