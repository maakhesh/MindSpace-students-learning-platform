const CourseData = {
    catalog: [
        { 
            id: "c-python", 
            title: "Python Masterclass (FreeCodeCamp)", 
            desc: "Learn Python from scratch. Covers variables, loops, data structures, and OOP in this comprehensive course.", 
            category: "Programming", difficulty: "Beginner", price: 0, streakReq: 0, icon: "🐍",
            youtubeId: "rfscVS0vtbw", 
            modules: ["1. Setup & Hello World", "2. Variables & Data Types", "3. Functions & Loops", "4. Dictionaries", "5. Classes & Objects"]
        },
        { 
            id: "c-java", 
            title: "Java Programming (Full Course)", 
            desc: "Master Java programming. Deep dive into JVM, multithreading, and collections framework.", 
            category: "Programming", difficulty: "Intermediate", price: 0, streakReq: 0, icon: "☕",
            youtubeId: "grEKMHGYyns", 
            modules: ["1. Introduction to Java", "2. Object Oriented Programming", "3. Data Structures in Java", "4. Advanced Concepts"]
        },
        { 
            id: "c-c", 
            title: "C Programming Core", 
            desc: "Understand memory management, pointers, and low-level system design with C.", 
            category: "Programming", difficulty: "Beginner", price: 0, streakReq: 0, icon: "©️",
            youtubeId: "KJgsSFOSQv0", 
            modules: ["1. Basics of C", "2. Pointers & Memory", "3. Structs & File I/O"]
        },
        { 
            id: "c-cpp", 
            title: "C++ for Competitive Programming", 
            desc: "STL, templates, and high-performance algorithms for competitive programming.", 
            category: "Programming", difficulty: "Advanced", price: 799, streakReq: 3, icon: "🚀",
            youtubeId: "8jLOx1hD3_o", 
            modules: ["1. C++ Basics", "2. Object Oriented C++", "3. Standard Template Library"]
        },
        { 
            id: "c-js", 
            title: "JavaScript Deep Dive", 
            desc: "Master closures, async/await, prototypes, and DOM manipulation in modern JS.", 
            category: "Programming", difficulty: "Intermediate", price: 0, streakReq: 0, icon: "🟨",
            youtubeId: "jS4aFq5-91M", 
            modules: ["1. Basics & Types", "2. DOM Manipulation", "3. ES6 Features", "4. Async JavaScript"]
        },
        { 
            id: "c-html", 
            title: "HTML5 & CSS3 Essentials", 
            desc: "Semantic tags, accessibility, flexbox, and grids for building solid web foundations.", 
            category: "Web Dev", difficulty: "Beginner", price: 0, streakReq: 0, icon: "🌐",
            youtubeId: "G3e-cpL7ofc", 
            modules: ["1. HTML Basics", "2. CSS Fundamentals", "3. Flexbox & Grid", "4. Responsive Design"]
        },
        { 
            id: "c-webdev", 
            title: "Fullstack Web Dev (React/Node)", 
            desc: "Build complete web apps from scratch. Frontend to backend integration.", 
            category: "Web Dev", difficulty: "Advanced", price: 999, streakReq: 10, icon: "💻",
            youtubeId: "nu_pCVPKzTk", 
            modules: ["1. React Frontend", "2. Express Backend", "3. MongoDB", "4. Fullstack Integration"]
        },
        { 
            id: "c-sql", 
            title: "SQL Database Mastery", 
            desc: "Write complex queries, joins, window functions, and optimize DB performance.", 
            category: "Database", difficulty: "Intermediate", price: 0, streakReq: 0, icon: "🗄️",
            youtubeId: "HXV3zeJZ1EQ", 
            modules: ["1. Intro to SQL", "2. CRUD Operations", "3. Joins & Relations", "4. Advanced Queries"]
        },
        { 
            id: "c-dbms", 
            title: "Database Management Systems", 
            desc: "Understand ACID properties, normalization, indexing, and transaction management.", 
            category: "Database", difficulty: "Advanced", price: 499, streakReq: 3, icon: "📚",
            youtubeId: "kBdlM6hNDAE", 
            modules: ["1. ER Diagrams", "2. Relational Algebra", "3. Normalization", "4. Transaction Control"]
        },
        { 
            id: "c-git", 
            title: "Git & GitHub Fundamentals", 
            desc: "Version control basics: commits, branching, merging, and resolving conflicts.", 
            category: "Tools", difficulty: "Beginner", price: 0, streakReq: 0, icon: "🌿",
            youtubeId: "RGOj5yH7evk", 
            modules: ["1. What is Git?", "2. Commits & Branches", "3. GitHub & Collaboration"]
        },
        { 
            id: "c-dsa", 
            title: "Data Structures & Algorithms", 
            desc: "The ultimate DSA course. Arrays, Graphs, DP, and complex problem-solving.", 
            category: "Core CS", difficulty: "Advanced", price: 0, streakReq: 7, icon: "🧩",
            youtubeId: "8hly31xKjhc", 
            modules: ["1. Arrays & Strings", "2. Linked Lists", "3. Trees & Graphs", "4. Dynamic Programming"]
        },
        { 
            id: "c-os", 
            title: "Operating Systems", 
            desc: "Learn about processes, threads, deadlocks, memory management, and file systems.", 
            category: "Core CS", difficulty: "Intermediate", price: 799, streakReq: 5, icon: "🖥️",
            youtubeId: "RoZceOABIEU", 
            modules: ["1. Introduction to OS", "2. Process Management", "3. Memory Management", "4. Concurrency"]
        },
        { 
            id: "c-networks", 
            title: "Computer Networks", 
            desc: "Understand the OSI model, TCP/IP, routing protocols, and network security foundations.", 
            category: "Core CS", difficulty: "Intermediate", price: 799, streakReq: 5, icon: "🌐",
            youtubeId: "qiQR5rTSshw", 
            modules: ["1. Network Layers", "2. TCP/UDP", "3. IP Addressing", "4. HTTP & DNS"]
        },
        { 
            id: "c-sysdesign", 
            title: "System Design Prep", 
            desc: "Scalability, microservices, load balancing, and designing massive systems.", 
            category: "Core CS", difficulty: "Advanced", price: 999, streakReq: 15, icon: "⚙️",
            youtubeId: "bU_eq8qyjzc", 
            modules: ["1. Intro to System Design", "2. Scalability", "3. Databases & Caching", "4. Microservices"]
        },
        { 
            id: "c-ml", 
            title: "Machine Learning for Everybody", 
            desc: "Supervised/unsupervised learning, regressions, and model evaluation.", 
            category: "AI & ML", difficulty: "Intermediate", price: 799, streakReq: 5, icon: "🤖",
            youtubeId: "i_LwzRmA_08", 
            modules: ["1. Intro to ML", "2. Linear Regression", "3. Neural Networks", "4. Model Evaluation"]
        },
        { 
            id: "c-dl", 
            title: "Deep Learning & Neural Networks", 
            desc: "Dive deep into Neural networks, CNNs, RNNs, and building models with PyTorch.", 
            category: "AI & ML", difficulty: "Advanced", price: 999, streakReq: 10, icon: "🧠",
            youtubeId: "V_xro1bcAuA", // PyTorch Course FreeCodeCamp
            modules: ["1. Tensors & Gradients", "2. Neural Networks", "3. Image Classification", "4. NLP Basics"]
        },
        { 
            id: "c-ai", 
            title: "Generative AI & LLMs", 
            desc: "Understand Transformers, prompt engineering, RAG pipelines, and building AI apps.", 
            category: "AI & ML", difficulty: "Advanced", price: 999, streakReq: 10, icon: "✨",
            youtubeId: "mEsleV16qdo", // LLM Course FreeCodeCamp
            modules: ["1. Intro to Generative AI", "2. Prompt Engineering", "3. LangChain & RAG", "4. Deploying AI Apps"]
        },
        { 
            id: "c-cloud", 
            title: "Cloud Computing AWS", 
            desc: "EC2, S3, Lambda, and designing cloud-native architectures on AWS.", 
            category: "Cloud", difficulty: "Intermediate", price: 799, streakReq: 5, icon: "☁️",
            youtubeId: "3hLmDS179YE", // AWS FreeCodeCamp
            modules: ["1. Cloud Concepts", "2. Compute & EC2", "3. Storage & S3", "4. Serverless Architecture"]
        }
    ],

    dsaTopics: [
        { id: "dsa-arrays", title: "Arrays", notes: "Arrays are contiguous memory locations.", problems: ["Two Sum", "Best Time to Buy/Sell Stock"] },
        { id: "dsa-strings", title: "Strings", notes: "Strings are character arrays. Immutable in many languages.", problems: ["Valid Palindrome", "Longest Substring"] },
        { id: "dsa-search", title: "Searching", notes: "Binary Search is O(log n) on sorted arrays.", problems: ["Binary Search", "Search Insert Position"] },
        { id: "dsa-sort", title: "Sorting", notes: "Merge Sort and Quick Sort are O(n log n).", problems: ["Merge Intervals", "Sort Colors"] },
        { id: "dsa-ll", title: "Linked List", notes: "Nodes connected via pointers. Good for insertions.", problems: ["Reverse Linked List", "Merge Two Sorted Lists", "Linked List Cycle"] },
        { id: "dsa-stack", title: "Stack", notes: "LIFO (Last In First Out). Used in recursion and parsing.", problems: ["Valid Parentheses", "Min Stack"] }
    ],

    roadmaps: {
        "Software Engineer": [
            { id: "se-1", title: "Foundational Programming", desc: "Start by picking a strongly typed language like Java or C++. Master variables, loops, conditionals, and functions." },
            { id: "se-2", title: "Object-Oriented Programming (OOP)", desc: "Understand classes, inheritance, polymorphism, encapsulation, and abstraction." },
            { id: "se-3", title: "Data Structures & Algorithms (DSA)", desc: "The core of software engineering. Learn Arrays, Linked Lists, Trees, Graphs, and Dynamic Programming." },
            { id: "se-4", title: "Version Control (Git & GitHub)", desc: "Learn how to commit code, manage branches, handle merge conflicts, and collaborate with teams." },
            { id: "se-5", title: "Databases (SQL & NoSQL)", desc: "Understand relational databases (PostgreSQL, MySQL), normalization, queries, and NoSQL alternatives like MongoDB." },
            { id: "se-6", title: "Computer Networks & OS", desc: "Learn how the internet works, OSI model, TCP/IP, processes, threads, and memory management." },
            { id: "se-7", title: "Backend Development", desc: "Build APIs using Node.js, Spring Boot, or Django. Learn RESTful principles and authentication." },
            { id: "se-8", title: "Frontend Basics", desc: "Understand HTML, CSS, and vanilla JavaScript to know how clients interact with your APIs." },
            { id: "se-9", title: "System Design & Architecture", desc: "Learn about load balancers, caching (Redis), message queues, and microservices for scalable apps." },
            { id: "se-10", title: "CI/CD & Cloud Deployment", desc: "Deploy your applications using Docker, GitHub Actions, and AWS or Azure." }
        ],
        "AI Engineer": [
            { id: "ai-1", title: "Master Python", desc: "Python is the undisputed king of AI. Deep dive into Python's syntax, list comprehensions, generators, and OOP." },
            { id: "ai-2", title: "Mathematics for AI", desc: "Review Linear Algebra (matrices, vectors), Calculus (derivatives, gradients), and Statistics (probability distributions)." },
            { id: "ai-3", title: "Data Manipulation & Analysis", desc: "Learn Pandas for dataframes, NumPy for fast numerical computations, and Matplotlib/Seaborn for data visualization." },
            { id: "ai-4", title: "Classical Machine Learning", desc: "Understand foundational ML using Scikit-Learn. Learn Regression, Decision Trees, SVMs, and K-Means." },
            { id: "ai-5", title: "Deep Learning Fundamentals", desc: "Learn the architecture of Neural Networks. Understand backpropagation, activation functions, and loss functions." },
            { id: "ai-6", title: "PyTorch & TensorFlow", desc: "Build neural networks using modern frameworks. PyTorch is highly recommended for research and AI engineering." },
            { id: "ai-7", title: "Natural Language Processing (NLP)", desc: "Process text data using NLTK and SpaCy. Understand Word Embeddings (Word2Vec, GloVe)." },
            { id: "ai-8", title: "Transformers & LLMs", desc: "The modern era of AI. Understand the Attention mechanism, BERT, GPT models, and how to use the HuggingFace library." },
            { id: "ai-9", title: "Prompt Engineering & RAG", desc: "Learn how to build Retrieval-Augmented Generation (RAG) pipelines using LangChain or LlamaIndex to query custom data." },
            { id: "ai-10", title: "Deploying AI Models", desc: "Serve your models to the web using FastAPI, containerize them with Docker, and deploy to cloud platforms." }
        ],
        "Machine Learning Engineer": [
            { id: "ml-1", title: "Python & Core CS Concepts", desc: "Build a strong foundation in Python and Data Structures (especially arrays, matrices, and trees)." },
            { id: "ml-2", title: "Probability & Statistics", desc: "Understand Bayes theorem, hypothesis testing, A/B testing, and statistical significance." },
            { id: "ml-3", title: "Exploratory Data Analysis (EDA)", desc: "Learn to clean messy datasets, handle missing values, and extract meaningful features (Feature Engineering)." },
            { id: "ml-4", title: "Supervised Learning", desc: "Master predictive models: Linear/Logistic Regression, Random Forests, and Gradient Boosting (XGBoost/LightGBM)." },
            { id: "ml-5", title: "Unsupervised Learning", desc: "Master pattern discovery: K-Means clustering, PCA for dimensionality reduction, and Anomaly Detection." },
            { id: "ml-6", title: "Model Evaluation & Tuning", desc: "Learn Cross-Validation, Hyperparameter tuning (GridSearch, Optuna), and metrics (F1-score, ROC-AUC, RMSE)." },
            { id: "ml-7", title: "Deep Learning (Vision & Text)", desc: "Build Convolutional Neural Networks (CNNs) for image tasks, and Recurrent Neural Networks (RNNs) for sequential data." },
            { id: "ml-8", title: "MLOps Fundamentals", desc: "Learn how to version data and models (DVC, MLflow), and automate model training pipelines." },
            { id: "ml-9", title: "Cloud ML Platforms", desc: "Train models at scale using AWS SageMaker, Google Vertex AI, or Azure Machine Learning." },
            { id: "ml-10", title: "Production Deployment", desc: "Optimize models (Quantization, ONNX), wrap them in REST APIs, and monitor for model drift in production." }
        ]
    }
};
