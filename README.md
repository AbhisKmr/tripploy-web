# Tripploy - System Design Documentation

## 📌 Overview

Tripploy is a personalised AI-driven travel itinerary planning platform designed to help users discover destinations and generate tailored travel plans based on their preferences, mood, group type, and more.

The system aims to:

* Recommend travel destinations dynamically based on user inputs.
* Generate complete day-wise itineraries using AI.
* Integrate with external travel APIs for real-world data.
* Offer collaborative trip planning for groups.
* Provide seamless experience across web and mobile platforms.

---

## 🧱 Core Features

1. **Conversational Q\&A for Personalization**
2. **AI-Powered Destination & Itinerary Generation**
3. **User Profiles and Trip Management**
4. **Transport and Accommodation Suggestions**
5. **Real-Time Group Collaboration**
6. **Offline Access & Multi-Device Support**
7. **Admin Panel for Data & Content Control**
8. **Monetisation via Affiliates and Premium Features**

---

## 🧠 Tech Stack

### Frontend

* **Web**: ReactJS + Chakra UI
* **Mobile**: React Native + Expo

### Backend

* **Framework**: NestJS (Modular Monolith / Microservices ready)
* **Authentication**: JWT + Refresh Tokens
* **Database**: MongoDB (NoSQL) + PostgreSQL (for relational data if needed)
* **Cache**: Redis (Q\&A session cache, API rate-limiting)
* **File Storage**: AWS S3 (images, docs)
* **Hosting**: AWS EC2 with NGINX + PM2

### AI & ML Layer

* **LLM**: OpenAI GPT / Local LLaMA models (for itinerary generation)
* **Embeddings**: OpenAI / SentenceTransformers
* **Vector DB**: Pinecone / Weaviate / Qdrant

### Third-Party APIs

* Google Places API
* Amadeus API
* TripAdvisor Partner API
* OpenTripMap
* Rome2Rio
* Booking.com Affiliate

---

## 🧩 System Architecture

```
                        ┌────────────────────────┐
                        │      Web / Mobile      │
                        │     (React / RN)       │
                        └────────────┬───────────┘
                                     │
                       ┌─────────────▼────────────┐
                       │        API Gateway        │
                       └─────────────┬────────────┘
           ┌─────────────────────────┼─────────────────────────┐
           │                         │                         │
┌──────────▼─────────┐  ┌────────────▼───────────┐  ┌──────────▼────────┐
│  Auth Service      │  │ User Profile Service   │  │ QuestionFlow Svc │
│ (JWT, OAuth)       │  │ (User prefs, history)  │  │ (Handles Q&A)    │
└──────────┬─────────┘  └────────────────────────┘  └──────────┬────────┘
           │                                               │
           │     ┌──────────────────────────────┐           │
           └────► │ Recommendation Service      │◄──────────┘
                 │ (Embeddings + LLM + Vectors) │
                 └──────────┬───────────────────┘
                            │
       ┌────────────────────▼────────────────────┐
       │ Destination & Itinerary Generator Svc   │
       └────────────────────┬────────────────────┘
                            │
         ┌──────────────────▼─────────────────┐
         │ External Travel APIs (Places, etc) │
         └─────────────────────────────────────┘
```

---

## 🔁 User Flow: End-to-End

1. **User visits app** → Starts with: "Plan a new trip"
2. **Q\&A module** sequentially asks:

   * Who are you travelling with?
   * Type of destination (beach, hills, city...)?
   * Preferred activities (hiking, food...)?
   * Transport (bike, rental, local)?
   * Duration, dates, and budget
3. Q\&A answers are converted to **semantic embeddings**
4. Embeddings are queried against **Vector DB** of destinations
5. The top-matching destination is selected
6. LLM (GPT or custom fine-tuned model) generates:

   * Day-wise itinerary
   * Travel tips
   * Stay and transport options
7. User can:

   * Edit, remove, replace items
   * Invite others for collaboration
   * Save/share/export

---

## ⚙️ Key Modules

### 1. **Auth Module**

* Register, Login (JWT)
* Password reset
* Guest mode support

### 2. **User Module**

* Profile, preferences
* Saved trips
* Travel history

### 3. **Trip Module**

* Start new trip
* Draft/save itinerary
* Collaboration logic

### 4. **Q\&A Flow Module**

* Dynamic question engine
* Tracks answer state
* Connects to the embedding service

### 5. **AI Recommendation Module**

* Embedding generation
* Vector DB similarity search
* Destination selector logic

### 6. **Itinerary Generator**

* OpenAI prompt templates
* Day-wise activity block creation
* Scoring mechanism for POIs

### 7. **External API Module**

* Abstracted API gateway to call:

  * Google Places
  * TripAdvisor
  * Booking.com

---

## 📦 Data Models

### User

```ts
{
  _id: ObjectId,
  name: string,
  email: string,
  preferences: {
    tripTypes: [],
    transportModes: [],
    activityInterests: []
  },
  savedTrips: [TripId],
  createdAt, updatedAt
}
```

### Trip

```ts
{
  _id: ObjectId,
  userId: ObjectId,
  destination: string,
  itinerary: [DayPlan],
  travelDates: { start, end },
  groupType: 'solo' | 'couple' | 'family' | 'group',
  budget: number,
  collaborators: [UserId],
  createdAt, updatedAt
}
```

### DayPlan

```ts
{
  date: string,
  activities: [
    { time: string, title: string, location: string, type: string }
  ]
}
```

---

## 🔐 Security Considerations

* HTTPS everywhere
* Input validation + sanitization
* JWT with short expiry + refresh tokens
* API rate limiting + CAPTCHA for abuse
* Role-based access control for admin endpoints

---

## 📈 Scalability & Performance

* Redis caching for API data + Q\&A sessions
* Use CDN (CloudFront) for static assets
* Rate-limit heavy APIs (Places, Booking)
* Auto-scale EC2 instances with a load balancer
* Use a queue (e.g., BullMQ) for heavy LLM processing

---

## 💸 Monetization Plan

* Free users: itinerary generation, community sharing
* Premium users:

  * PDF exports
  * Concierge AI
  * Exclusive destinations
  * Ad-free
* Affiliate partners:

  * Booking.com
  * Rental APIs
  * Local experience providers

---

## 🚀 Future Enhancements

* Voice-based trip planning
* Real-time trip updates (e.g., weather change)
* UGC content (reviews, check-ins)
* In-app purchases (local tours, insurance)
* Travel badge gamification

---

## 🛠 Tools & Services

* **Frontend**: Chakra UI, React Hook Form, Expo
* **Backend**: NestJS + TypeORM, MongoDB/Mongoose
* **AI/ML**: OpenAI, Cohere, Pinecone
* **CI/CD**: GitHub Actions + EC2 deploy scripts
* **Monitoring**: Sentry, LogRocket (frontend), PM2 logs

---

## ✅ Next Steps

1. Build the Q\&A flow frontend and backend APIs
2. Integrate OpenAI embeddings + basic recommendation logic
3. Fetch POIs from Google Places or OpenTripMap
4. Use LLM to stitch sample itineraries
5. Release MVP for early feedback
