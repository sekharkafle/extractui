### Demo UI App for LLM based chat application
The source code to build a basic chat based application using GenAI or Large Language Model (LLM). 

Full sequence diagram of the chat application is shown below: 
![Chat App Sequence Diagram](chat-arch.PNG)

\
This repo contains the frontend code built with React that consumes backend service in AWS Lambda exposed through API gateway.

The logic to consume service requires creating a list of messages from prior conversation between the user and the AI service. We can then append the most recent user message and pass to the service. The service will return the response from the AI which we can append to the message list. Finally, we can update the message list in the chat UI. This process will be replicated every time the user enters a new message in the UI.

```
    const messagesWithUserReply = messages.concat({ id: messages.length.toString(), content: input, role: "user" });
      setMessages(messagesWithUserReply);
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          messages: messagesWithUserReply
        })
      });
      const json = await response.json();
      if (response.status === 200) {
        const newMessages = messagesWithUserReply;
        setMessages([...newMessages, { id: newMessages.length.toString(), content: json.output, role: "assistant" }]);
      }
```

The final UI will look something like this:
![Chat App Sequence Diagram](chat-arch.PNG)


For complete details on the application, please check here: [http://kafles.com/2024/04/13/practical-llm1/](http://kafles.com/2024/04/13/practical-llm1/)

Happy Chatting!!!
