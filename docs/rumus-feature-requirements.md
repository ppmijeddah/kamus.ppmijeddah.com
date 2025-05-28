## Overview

This document outlines the feature requirements for a language learning application focused on practical Arabic Amiyah conversation. The application aims to equip users with the necessary phrases and understanding to navigate common real-world interactions.


## Requirements
**I. Core Content & Learning Experience:**

1.  **Scenario Library:**
    *   Users can browse a list of curated scenarios (like the ones you mentioned: taxi, restaurant, shopping, etc.).
    *   Scenarios are ordered by a predefined "importance" or "frequency" to guide new learners.
    *   Each scenario has a brief description of the situation it covers.

2.  **Conversation Display:**
    *   Within each scenario, users can view one or more typical conversation dialogues.
    *   Dialogues are presented in:
        *   Romanized transliteration (e.g., "Marhaba" for مرحبا).
        *   Translation into the Bahasa Indonesia
    *   Clear indication of who is speaking (e.g., "You," "Driver," "Waiter").

3. **Key Phrase Information and Content Integrity**

To enhance learning from conversation scenarios, the application must provide users with detailed information about key phrases and ensure the accuracy and manageability of this interconnected content.

**3.1. Interactive Access to Dictionary Words within Conversations:**
    *   Users must be able to interact with words within the displayed conversation dialogues that also exist in the dictionary.
    *   Upon such interaction, the application must present comprehensive information about the selected word, displayed in an easily dismissible pop-up or modal, drawing from the dictionary entries.

**3.2. Accuracy and Management of Linked Content:**
    *   The system must maintain accurate and valid links between words identified in conversation scenarios and their corresponding entries in the main dictionary.
    *   A clear and manageable process must be established for authoring conversation content. This process includes defining scenarios, creating conversations within those scenarios, linking words within the conversational text to the correct dictionary entries, and providing relevant contextual explanations for their use within each specific scenario.

**II. User Interaction & Engagement:**

4.  **Navigation & Discovery:**
    *   Easy navigation between scenarios and conversations.
    *   Search functionality to find scenarios or specific phrases.

5.  **Saving & Personalization:**
    *   Users can "save" or "favorite" entire scenarios or specific key phrases they want to focus on.
    *   A personal dashboard or section to review saved items.

**III. Content Contribution & Quality:**

6.  **Reporting Mistakes:**
    *   A simple way for users to report inaccuracies in the Amiyah text, transliteration, translation, or audio.
    *   Option to provide a brief comment with the report.

7.  **Suggesting Content:**
    *   Users can suggest new scenarios they'd find helpful.
    *   Users can suggest alternative phrasing or additional conversation examples for existing scenarios.

8. **User Data Management:**
    *   Securely store user preferences and saved items in local storage.


## ERD
```
erDiagram
    categories {
        int id PK "Category ID"
        text name UK "Name (e.g., Food, Travel)"
        int rank "Display order"
        timestamp created_at
    }

    dictionary_entries {
        int id PK "Dictionary Entry ID"
        text uuid UK "Unique ID"
        text indonesia "Bahasa Indonesia translation"
        text amiyah "Amiyah transliteration"
        text amiyah_arab "Amiyah in Arabic script"
        text fushah "Fushah equivalent"
        text fushah_arab "Fushah in Arabic script"
        int category_id FK "Links to categories.id"
        text example "Example sentence"
        timestamp created_at
    }

    scenarios {
        int id PK "Scenario ID"
        text uuid UK "Unique ID"
        text title "Title (e.g., Ordering a taxi)"
        text description "Scenario description"
        int importance_rank "Ordering for learners"
        timestamp created_at
    }

    conversations {
        int id PK "Conversation ID"
        text uuid UK "Unique ID"
        int scenario_id FK "Links to scenarios.id"
        text title "Dialogue title"
        text description "Conversation description"
        timestamp created_at
    }

    sentences {
        int id PK "Sentence ID"
        text uuid UK "Unique ID"
        int conversation_id FK "Links to conversations.id"
        text speaker "Who is speaking"
        text amiyah_text_arab "Sentence in Arabic (plain)"
        text amiyah_text_transliteration "Sentence transliterated (plain)"
        text translation_bahasa "Translation to Bahasa"
        int order_in_conversation "Sentence sequence"
        timestamp created_at
    }

    sentence_dictionary_links {
        int id PK "Link ID"
        int sentence_id FK "Links to sentences.id"
        int dictionary_entry_id FK "Links to dictionary_entries.id"
        int start_offset "Start char position in sentence"
        int end_offset "End char position in sentence"
        text contextual_explanation "Context-specific note"
        timestamp created_at
    }

    categories ||--o{ dictionary_entries : "has many"
    scenarios ||--o{ conversations : "has many"
    conversations ||--o{ sentences : "has many"
    sentences ||--o{ sentence_dictionary_links : "links via"
    dictionary_entries ||--o{ sentence_dictionary_links : "linked in"

    %% Notes on relationships:
    %% categories {1}--{many} dictionary_entries
    %% scenarios {1}--{many} conversations
    %% conversations {1}--{many} sentences
    %% sentences {many}--{many} dictionary_entries (through sentence_dictionary_links)
```

## Scenarios

1.  **Order & directing a taxi for a trip:**
    *   Covers the language needed to request a taxi, state your destination, and confirm the ride. Also focuses on phrases used to guide a taxi driver, such as "turn left," "go straight," "stop here," and understanding driver questions
2.  **Ordering food at a restaurant:**
    *   Encompasses the entire process from asking for a table, understanding the menu, ordering dishes and drinks, making special requests, and asking for the bill.
3.  **Negotiating price:**
    *   Involves language for discussing and bargaining prices, typically in markets or with service providers where prices might be flexible.
4.  **Receiving shipped item/food bought via online stores:**
    *   Focuses on interactions with delivery personnel, confirming identity, checking the item, and handling any immediate issues with the delivery.
5.  **Shopping for groceries:**
    *   Involves navigating a supermarket, asking for specific items (fruits, vegetables, etc.), inquiring about quantities, and the payment process.
6.  **Renting a room on a hotel/apartment:**
    *   Includes vocabulary and phrases for inquiring about availability, room features, prices, and completing the booking process for short-term accommodation.
7.  **General requests and politeness:**
    *   Covers common polite expressions, making simple requests (e.g., asking for something to be passed to you, asking for a small favor), and responding appropriately.
8.  **Making small talk:**
    *   Includes initiating and participating in brief, casual conversations on common topics like weather, well-being, or general observations to build rapport.
