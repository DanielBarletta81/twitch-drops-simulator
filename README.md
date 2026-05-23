# Twitch Drops Simulator

A real-time, event-driven simulation of Twitch Drops and creator sponsorship mechanics.

This project models how viewers engage with a live stream, accumulate watch progress, unlock rewards, and interact with configurable campaigns—all delivered through a live WebSocket pipeline and interactive React dashboard.

---

## 🚀 What This Is

This system simulates the core mechanics behind Twitch Drops and creator monetization:

- Viewers accumulate watch time in real time  
- Rewards unlock dynamically based on engagement  
- Campaigns can be configured, paused, and updated live  
- Systems deliver updates instantly to a user-facing dashboard  

---

## 🧠 Why It Matters

Creator monetization systems require tight coordination between:

- real-time event pipelines  
- user engagement tracking  
- reward logic  
- frontend state synchronization  

This project demonstrates those systems working together end-to-end in a simplified but realistic architecture.

---

## 🔑 Key Concept

This system is intentionally designed to mirror real-world creator monetization platforms like Twitch, where:

> **engagement → reward → retention → platform growth**

---

## 🏗 Architecture

```txt
Activity Generator
      ↓
Drop Processor (business logic)
      ↓
Analytics + Insight Layer
      ↓
WebSocket Broadcaster
      ↓
React Dashboard