# Konect
> Konect is a social media platform to share pictures and stories. A place to chat with friends and face time them.

## High-Level Design
```mermaid
---
config:
  layout: dagre
  theme: dark
  look: neo
---
flowchart TB
subgraph konect["Konect"]
 subgraph WEB["Web Client<br>React"]
  end
 subgraph DNS["DNS"]
  end
 subgraph NGINX["Nginx Reverse Proxy<br>- Routing<br>- Rate Limiting"]
  end
 subgraph ClientServer["Client Server"]
  end
 subgraph subGraph3["Main Server"]
        API["REST API Server<br>Node.js/Express<br>- JWT Authentication<br>- Google OAuth<br>- Redis Caching"]
        SS["Session Management"]
        SIG["Signaling Server(WS)<br>-WebRTC Setup<br>"]
        AUTH["Authentication Service<br>- OAuth Provider<br>- JWT Management<br>- User Verification"]
        SFU["SFU Server<br>Mediasoup<br>- Video Routing<br>- Audio Routing"]
  end
 subgraph subGraph6["Data Layer"]
        MONGO[("MongoDB<br>- User Data<br>- Messages<br>- Posts<br>- Metadata<br>- Session Store")]
        REDIS[("Redis Server<br>- Rate Limiting<br>- Query Cache<br>- Pub/Sub<br>- WebSocket State")]
        S3[("S3 Object Store<br>- Profile Pictures<br>- Media Files<br>- Stories<br>- Post Attachments")]
  end
 subgraph subGraph7["External Services"]
        GOOGLE["Google OAuth 2.0<br>- User Authentication<br>- Profile Information"]
  end
 subgraph subGraph8["Cloud Infrastructure"]
        CDN["CDN"]
        MONITOR["Monitoring/Logs"]
  end
  end
    WEB --> NGINX & CDN & DNS & GOOGLE
    NGINX --> API & ClientServer
    API --> MONGO & REDIS & S3 & AUTH & MONITOR & SIG
    AUTH --> GOOGLE & SS & MONGO
    SS --> MONGO
    SIG --> SFU & REDIS & WEB
    SFU --> REDIS & WEB
    CDN --> S3
     MONGO:::Class_01
     REDIS:::Peach
     S3:::Rose
     WEB:::Rose
     NGINX:::Class_01
     DNS:::Peach
     konect:::Backdrop
     subGraph3:::Container
     subGraph6:::Container
     subGraph8:::Container
     subGraph7:::Container
     GOOGLE:::Google
     API:::Api
     AUTH:::Auth
     SS:::Ss
     SIG:::Auth
     SFU:::Ss
     CDN:::Ss
     MONITOR:::Api
     ClientServer:::Api
    classDef Rose stroke-width:1px, stroke-dasharray:none, stroke:#FF5978, fill:#FFDFE5, color:#8E2236
    classDef Pine stroke-width:1px, stroke-dasharray:none, stroke:#254336, fill:#27654A, color:#000000
    classDef Peach stroke-width:1px, stroke-dasharray:none, stroke:#FBB35A, fill:#FFEFDB, color:#8F632D
    classDef Class_01 fill:#C8F6C9, color:#000000, stroke:#259336
    classDef Google fill:#28c4E0, stroke:#2850F0, color:#000000
    classDef Backdrop fill:#000000
    classDef Api stroke:#F490F0
    classDef Auth stroke:#1AFF20
    classDef Container fill:#262626
    classDef Ss stroke:#FBF122
    linkStyle 0 stroke:#ffffff,stroke-width:1px,fill:none
    linkStyle 1 stroke:#ffffff,stroke-width:1px,fill:none
    linkStyle 2 stroke:#ffffff,stroke-width:1px,fill:none
    linkStyle 3 stroke:#ffffff,stroke-width:1px,fill:none
    linkStyle 4 stroke:#ffffff,stroke-width:1px,fill:none
    linkStyle 5 stroke:#ffffff,stroke-width:1px,fill:none
    linkStyle 6 stroke:#ffffff,stroke-width:1px,fill:none

```

## Database design
```mermaid
%%{init: {
    'theme': 'base',
    'themeVariables': {
        'primaryColor': '#ffffff',
        'primaryTextColor': '#000000',
        'primaryBorderColor': '#000000',
        'lineColor': '#ffffff',
        'sectionBkgColor': '##E0E0E0',
        'altSectionBkgColor': '##E0E0E0',
        'gridColor': '#000000'
    }
}}%%
erDiagram
	direction TB
	User {
		ObjectId _id PK ""  
		String authType  ""  
		String username UK ""  
		String email UK ""  
		String passwordHash  ""  
		Boolean isActive  ""  
		Date createdAt  ""  
		Date updatedAt  ""  
	}

	UserProfile {
		ObjectId _id PK ""  
		ObjectId userId FK ""  
		String firstName  ""  
		String lastName  ""  
		String profilePicture  ""  
		String bio  ""  
		Number age  ""  
		String gender  ""  
		String location  ""  
		String website  ""  
		Object privacy  ""  
		Date updatedAt  ""  
	}

	Post {
		ObjectId _id PK ""  
		ObjectId authorId FK ""  
		String title  ""  
		String content  ""  
		Object media  ""  
		String visibility  ""  
		Array tags  ""  
		Boolean isEdited  ""  
		Date createdAt  ""  
		Date updatedAt  ""  
	}

	PostEngagement {
		ObjectId _id PK ""  
		ObjectId postId FK ""  
		Array likes  ""  
		Array shares  ""  
		Number views  ""  
		Number likeCount  ""  
		Number commentCount  ""  
		Number shareCount  ""  
	}

	Comment {
		ObjectId _id PK ""  
		ObjectId postId FK ""  
		ObjectId authorId FK ""  
		String content  ""  
		Array Replies  ""  
		Boolean isEdited  ""  
		Date createdAt  ""  
		Date updatedAt  ""  
	}

	CommentEngagement {
		ObjectId _id PK ""  
		ObjectId commentId FK ""  
		Array likes  ""  
		Number likeCount  ""  
		Number replyCount  ""  
	}

	Conversation {
		ObjectId _id PK ""  
		Array participants  ""  
		String type  ""  
		String name  ""  
		Date lastMessageAt  ""  
		Date createdAt  ""  
	}

	Message {
		ObjectId _id PK ""  
		ObjectId conversationId FK ""  
		ObjectId senderId FK ""  
		String content  ""  
		String messageType  ""   
		Boolean isEdited  ""  
		Date createdAt  ""  
		Date updatedAt  ""  
	}

	CallLog {
		ObjectId _id PK ""  
		ObjectId callerId FK ""  
		ObjectId receiverId FK ""  
		String type  ""  
		String status  ""  
		Number duration  ""  
		Date createdAt  ""  
	}

    UserData {
        ObjectId _id PK ""
        ObjectId user_id FK ""
        Array conversations
        Array call_logs ""
        Array contacts ""
    }


    User||--||UserData:"user_data"
    UserData||--o{User:"contacts"
	User||--||UserProfile:"userId"
	User||--o{Post:"authorId"
    UserData||--o{Conversation:"conversations"
	Post||--||PostEngagement:"postId"
	Post||--o{Comment:"postId"
	User||--o{Comment:"authorId"
	Comment||--||CommentEngagement:"commentId"
	Comment||--o{Comment:"Reply"
	%% User}o--o{Conversation:"participants"
	Conversation||--o{Message:"conversationId"
	%% User||--o{Message:"senderId"
	User}o--o{PostEngagement:"likes/shares"
	%% User}o--o{Message:"readBy"
	%% User||--o{Notification:"userId"
	%% User||--o{Notification:"actorId"
	UserData||--o{CallLog:"  "
	%% UserData||--o{CallLog:"receiverId"

%% Styling
    classDef userEntities fill:#e1f5fe,stroke:#0277bd,stroke-width:2px,color:#000
    classDef contentEntities fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000
    classDef engagementEntities fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px,color:#000
    classDef communicationEntities fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#000
    classDef dataEntities fill:#fce4ec,stroke:#c2185b,stroke-width:2px,color:#000
    
    class User,UserProfile userEntities
    class Post,Comment contentEntities
    class PostEngagement,CommentEngagement engagementEntities
    class Conversation,Message,CallLog communicationEntities
    class UserData dataEntities

```

## How it started
> While studying backend designs I was introduced to WebRTC, a protocol which was especifically written for video/audio transmission over web-browsers. WebRTC provided Peer-To-Peer data transmission. I started building very basic versions of video calling web-apps. WebRTC wasn't just a protocol but a system of different protocols which predates WebRTC itself.
>
> After experimenting and reading a lot I decided to make use of it through some project work and what else comes to mind when thinking of connectivity and communication, a social networking platform.
> And "I wanted to learn frontend development too XD". I chose React.js for this because of it's simplicity and well documented guide.
> 
### Challenges
>
> Peer-To-Peer type communication is hard to establish without any knowledge of client address and configuration. WebRTC requires a Singalling server to initialise and communicate configurations.
>
> The system and network configurations were not enough to establish a p2p connection. Devices behind a private-addressess rquired NAT traversal or a mapping to tell where to send the packets.
> 
> This type of connection failed when the clients were behind a strict NAT type. So when some clients could connect with each other some were restricted by NAT rules and firewalls.
> 
> [WebRTC for the curious](https://webrtcforthecurious.com/) covers NAT traversal in great detail. This paper introduced me with a lot of networking challenges and eventually learning a lot more about media transmission.
>
> This was not enough for me to build the application. I was still in search of a good library which can handle request framing and capabilities to establish a WebRTC connection without writing some complex mechanisms like handling changes in network, video codecs, etc. which were out of my scope of learning.
>
> I kept sever logic and handling different video streams to myself. That is to build a SFU(Selective Forwarding unit). This is when I discovered [mediasoup](https://mediasoup.org/) a low level access to webRTC APIs. It was all I needed. It wasn't a magic black-box which just did the thing and wasn't like an arch machine where everyting had to be done manually.
>
> Using mediasoup I wrote my own video transmission server that managed video streams connections between several peers. Instead of p2p the video packets were going through my publicly deployed server which solved the issue of NAT traversal.

## Media transmission
```mermaid
sequenceDiagram
    participant LP as Participant<br/>Transport (LP)
    participant VP as VideoProducer<br/>WebRTCTransport<br/>Transport(RP)
    participant Router as Router
    participant VC as VideoConsumer<br/>WebRTCTransport<br/>Transport(RC)
    participant LC as Participant<br/>Transport (LC)

    Note over VP,VC: Server side
    Note over LP,LC: Setup Phase
    Router->>LP: Router rtpCapabilities
    Note over LP: Create new Device and call load() with received rtpCapabilities
    Note over LP: Call getUserMedia and get video track
    Router->>LC: Router rtpCapabilities
    Note over LC: Create new Device and call load() with received rtpCapabilities
    LP->>Router: Request WebRTC Transport
    Note over Router: Use router to create WebRTC Transport(RP)
    Router->>LP: Send Transport(RP) params
    Note over LP: Use Device to crate SEND Transport(LP)
    Note over LP: Use SEND Transport(LP) and call it's produce() method which fires off two events(connect & produce)
    Note over LP: connect returns dtlsParameters
    LP->>VP: Send dtlsParameters
    Note over VP: call connect({dtlsParameters}) method of Transport(RP)
    Note over LP: produce returns parameters callback and errback
    LP->>VP: Send parameters
    Note over VP:Call produce() method of Transport(RP) and pass in<br/> parameters({kind, rtpParameters})
    VP->>LP: Send producer id
    Note over LP: Producer is now sending media to the server
    VP->>LC: Send producer id

    LC->>Router: Request WebRTC Transport
    Note over Router: Use Router to create WebRTC Transport(RC)
    Router->>LC:Send Transport(RC) params
    Note over LC: Use Device to create RECV Transport(LC)
    LC->>Router: Send Device rtpCapabilities(rtp) + producer id
    Note over Router,VC:Check if Router can consume
    Note over VC:..if so then can consume({rtp, id}) method of Transport(RC)
    VC->>LC: Send consumer id kind, rtpParameters
    Note over LC: Use RECV Transport(LC) and call it's consume({}) method which fires off connect event
    Note over LC: Connect returns dtlsParameters
    LC->>VC:Send dtlsParameters
    Note over VC: Call connect({dtlsParameters}) method of Transport(RC)
    Note over LC:Consumer is now receiving media from the server

    
    Note over LP,LC: Media Flow
    LP-->>VP: SRTP (Media Stream)
    VP-->>Router:
    Router-->>VC:
    VC-->>LC: SRTP (Media Stream)
    Note over VP,VC: Server side
```

### Moving forward
Now that I had a good feature to add in my project it still lacked the use of my frontend knowledge and an eager to design and build web-pages. With this idea of video calls I implemented live chatting along with a page to share pictures and stories.

This project wasn't just about building a web-application but it led me to read a lot of documents and papers to know what is going under the hood.

### How I ensured scalability
Testing your application's scalability without real world traffic or stress tests is like shooting arrows in the dark. Still, I could not pass the chance to build one. 
There were some checks I tried to ensure scalability
- Caching DB data and session keys.
- Uploading large files in parts(multipart uploads)
- Rate limitting at Reverse Proxy
- Object stores with CDNs.
   > So here I learned about two types of CDNs
   	- Pull CDN
   	- Push CDN
- Lazy loading media resources at the client side.
> I think I have missed some feature when I finished this project. Caching at server side was never implemented into the flow though the redis server was initialised. It was a time constraint due to exams coming up. I had already spent a lot of time studying webRTC and learning React.

## Why MongoDB
When building a consumer project data storage is one of the most important requirements. The flexibility offered by a non-RDBMS was helpful while developing the project where changes were common. Initially I had not planned what type of data will be stored since the idea was growing with the project. Having worked with MongoDB before I was confident with it's usage. Although I knew my project was not meant for a real world use with heavy traffic I still kept in mind scalability of data storage over cloud where non-RDBMS are easy to scale horizontally compared to RDBMS. 
MongoDB is a non-relational database. The schema less design was helpful to implement features later on 



