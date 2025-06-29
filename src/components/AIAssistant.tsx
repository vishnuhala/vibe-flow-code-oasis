
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Code, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language?: string;
}

interface AIAssistantProps {
  user: any;
  onUpdateUser: (userData: any) => void;
}

const AIAssistant = ({ user, onUpdateUser }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI coding assistant. Ask me anything about programming - from basic syntax to complex algorithms, debugging help, or best practices. I can help with JavaScript, Python, Java, C++, HTML, CSS, and many other languages!',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Sample programming responses - In a real app, this would connect to an actual AI API
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Detect programming language
    let detectedLanguage = '';
    if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) detectedLanguage = 'javascript';
    else if (lowerMessage.includes('python')) detectedLanguage = 'python';
    else if (lowerMessage.includes('java')) detectedLanguage = 'java';
    else if (lowerMessage.includes('html')) detectedLanguage = 'html';
    else if (lowerMessage.includes('css')) detectedLanguage = 'css';
    else if (lowerMessage.includes('react')) detectedLanguage = 'react';
    
    // Sample responses based on common programming questions
    if (lowerMessage.includes('loop') || lowerMessage.includes('for') || lowerMessage.includes('while')) {
      return `Here are some common loop patterns:

**JavaScript:**
\`\`\`javascript
// For loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// While loop
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}

// For...of loop (arrays)
const arr = [1, 2, 3, 4, 5];
for (const item of arr) {
  console.log(item);
}
\`\`\`

**Python:**
\`\`\`python
# For loop
for i in range(5):
    print(i)

# While loop
count = 0
while count < 5:
    print(count)
    count += 1

# For loop with list
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    print(num)
\`\`\``;
    }
    
    if (lowerMessage.includes('function') || lowerMessage.includes('method')) {
      return `Here's how to create functions in different languages:

**JavaScript:**
\`\`\`javascript
// Function declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Arrow function
const add = (a, b) => a + b;

// Function with default parameters
function multiply(a, b = 1) {
  return a * b;
}
\`\`\`

**Python:**
\`\`\`python
# Basic function
def greet(name):
    return f"Hello, {name}!"

# Function with default parameter
def multiply(a, b=1):
    return a * b

# Lambda function
add = lambda a, b: a + b
\`\`\``;
    }
    
    if (lowerMessage.includes('array') || lowerMessage.includes('list')) {
      return `Working with arrays/lists:

**JavaScript Arrays:**
\`\`\`javascript
// Creating arrays
const fruits = ['apple', 'banana', 'orange'];
const numbers = [1, 2, 3, 4, 5];

// Common array methods
fruits.push('grape');        // Add to end
fruits.pop();               // Remove from end
fruits.unshift('mango');    // Add to beginning
fruits.shift();             // Remove from beginning

// Array iteration
fruits.forEach(fruit => console.log(fruit));
const lengths = fruits.map(fruit => fruit.length);
const longFruits = fruits.filter(fruit => fruit.length > 5);
\`\`\`

**Python Lists:**
\`\`\`python
# Creating lists
fruits = ['apple', 'banana', 'orange']
numbers = [1, 2, 3, 4, 5]

# Common list methods
fruits.append('grape')      # Add to end
fruits.pop()               # Remove from end
fruits.insert(0, 'mango')  # Insert at position
fruits.remove('banana')    # Remove specific item

# List comprehension
lengths = [len(fruit) for fruit in fruits]
long_fruits = [fruit for fruit in fruits if len(fruit) > 5]
\`\`\``;
    }
    
    if (lowerMessage.includes('debug') || lowerMessage.includes('error')) {
      return `Debugging tips:

🔍 **Common Debugging Strategies:**
1. **Console Logging**: Add console.log() or print() statements
2. **Check Browser DevTools**: Use F12 to inspect errors
3. **Read Error Messages**: They often tell you exactly what's wrong
4. **Rubber Duck Debugging**: Explain your code line by line

**JavaScript Debugging:**
\`\`\`javascript
console.log('Variable value:', myVariable);
console.error('Error occurred:', error);
console.table(arrayData);
debugger; // Breaks execution in browser
\`\`\`

**Python Debugging:**
\`\`\`python
print(f"Variable value: {my_variable}")
import pdb; pdb.set_trace()  # Python debugger
\`\`\`

**Common Error Types:**
- **Syntax Error**: Missing brackets, semicolons
- **Reference Error**: Using undefined variables
- **Type Error**: Wrong data type operations
- **Logic Error**: Code runs but gives wrong results`;
    }
    
    if (lowerMessage.includes('react') || lowerMessage.includes('component')) {
      return `React Component Examples:

**Functional Component:**
\`\`\`jsx
import React, { useState } from 'react';

const MyComponent = ({ title }) => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

export default MyComponent;
\`\`\`

**useEffect Hook:**
\`\`\`jsx
import React, { useState, useEffect } from 'react';

const DataComponent = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Fetch data when component mounts
    fetchData().then(setData);
  }, []); // Empty dependency array = run once
  
  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
\`\`\``;
    }
    
    // Default response
    return `I'd be happy to help with your programming question! Here are some ways I can assist:

🔧 **What I can help with:**
- Code syntax and examples
- Debugging and error fixing
- Best practices and optimization
- Algorithm explanations
- Framework-specific questions (React, Vue, etc.)
- Database queries and design
- API integration

💡 **Programming Languages I support:**
JavaScript, Python, Java, C++, HTML, CSS, TypeScript, SQL, and many more!

Feel free to ask specific questions like:
- "How do I create a loop in Python?"
- "What's the difference between let and const in JavaScript?"
- "How do I center a div with CSS?"
- "Explain async/await in JavaScript"

What would you like to learn about?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAIResponse(inputMessage),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);

      // Update user stats
      const updatedUser = {
        ...user,
        aiQuestionsAsked: (user.aiQuestionsAsked || 0) + 1
      };
      onUpdateUser(updatedUser);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const quickQuestions = [
    "How do I create a function in JavaScript?",
    "Explain Python loops",
    "What are React hooks?",
    "How to debug JavaScript code?",
    "CSS flexbox tutorial"
  ];

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-white">
          <Bot className="h-5 w-5" />
          AI Coding Assistant
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-500/20 text-green-300">
            Online
          </Badge>
          <span className="text-white/70 text-sm">
            Questions asked: {user.aiQuestionsAsked || 0}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 space-y-4">
        {/* Quick Questions */}
        <div className="flex flex-wrap gap-2">
          {quickQuestions.slice(0, 3).map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
              onClick={() => setInputMessage(question)}
            >
              <Lightbulb className="h-3 w-3 mr-1" />
              {question.split(' ').slice(0, 3).join(' ')}...
            </Button>
          ))}
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 h-[400px]" ref={scrollAreaRef}>
          <div className="space-y-4 pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white ml-auto'
                      : 'bg-white/10 text-white backdrop-blur-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/10 text-white backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about programming..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </div>
  );
};

export default AIAssistant;
