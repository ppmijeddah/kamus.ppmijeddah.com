## Requiremenets

### I. User-Facing Requirements (Reporting an Issue)

1.  **Initiating a Report:**
    *   **Clear Call to Action:** An easily identifiable button or icon (e.g., a small flag, "Report Issue," or even a WhatsApp icon) on each `DictionaryCard`.
    *   **Contextual Information:** When the user clicks the report button, the system needs to gather information about the specific entry being reported to pre-fill the WhatsApp message.

2.  **Information to Pre-fill in WhatsApp Message:**
    *   **Entry Identifier:** Crucially, we need a way to tell which dictionary entry the report is about. Since the `id` from `dictionary.sqlite` can change, we should ideally use a more stable identifier if possible. You can add a persistent `entry_uuid` to your `dictionary.csv` and load it into the app (even if not stored in `dictionary.sqlite` initially, but just passed to the client), that would be the most robust way to identify the entry. Example: `Report for entry UUID: [uuid_here]`
    *   **Space for User Input:** The pre-filled message should clearly prompt the user to describe:
        *   What is wrong?
        *   What should it be? (Optional suggestion)
    *   Example pre-filled message structure:
        ```
        Halo, saya ingin melaporkan potensi kesalahan pada entri kamus berikut:

        Kata Indonesia: [Pre-fill with entry.indonesia]
        Kata Amiyah (Arab): [Pre-fill with entry.amiyah_arab]
        ID Entri: [Pre-fill with entry_uuid]

        Mohon jelaskan kesalahannya di sini:
        [User types here]

        Jika ada, saran perbaikan:
        [User types here]

        Terima kasih!
        ```

3.  **User Experience:**
    *   Clicking the report button directly opens WhatsApp with the pre-filled message.
    *   Simple and familiar for users.

### II. Maintainer-Facing Requirements (Managing Reports)

1.  **Receiving Reports:**
    *   Reports arrive as WhatsApp messages to the designated number (e.g., `+6285156562419` as used in the interest feature).
2.  **Manual Tracking:**
    *   You (the maintainers) will need to manually track these reports. This could be in a spreadsheet, a simple text file, or a task management tool.
    *   You'll need to note:
        *   The reported entry (based on the pre-filled info).
        *   The described issue.
        *   The suggested correction.
        *   Action taken (e.g., "Corrected in CSV," "Reviewed - No change needed").
3.  **Actioning Reports:**
    *   Based on the WhatsApp report, you'll manually find the entry in your `dictionary.csv` file.
    *   Make corrections in the CSV.
    *   The next time you delete `dictionary.sqlite` and run `kamus.ppmijeddah.com/scripts/init-database.js`, the changes will go live.

### III. Technical Implementation Steps

1.  **Update `DictionaryCard` Component (`kamus.ppmijeddah.com/src/modules/dictionary/components/dictionary-card.tsx`):**
    *   Add a "Report Issue" button/icon.
    *   This button will need access to the current `entry`'s data (at least `indonesia` and `amiyah_arab`, or preferably an `entry_uuid` if you implement that).

2.  **Create a Helper Function (similar to `kamus.ppmijeddah.com/src/modules/translate/services/interest.ts`):**
    *   Let's call it something like `reportEntryViaWhatsapp(entryData: { indonesia: string; amiyah_arab: string; /* or entry_uuid: string */ })`.
    *   This function will:
        *   Construct the pre-filled WhatsApp message string using the entry data and the template.
        *   Encode the message for a URL.
        *   Open the `https://wa.me/YOUR_NUMBER?text=ENCODED_MESSAGE` URL.
    *   The `YOUR_NUMBER` would be the same one used for the interest form.

3.  **Integrate into `DictionaryCard`:**
    *   The "Report Issue" button's `onClick` handler will call this new helper function, passing the relevant data from the `entry` prop.

### Advantages of this approach:

*   **Rapid Implementation:** Much faster to build than a full database-backed reporting system.
*   **Leverages Existing Patterns:** Uses a similar mechanism to your existing "interest form."
*   **Low Initial Overhead:** No new database or admin UI to build and maintain immediately.

### Disadvantages:

*   **Manual Tracking:** Can become cumbersome if you receive many reports.
*   **No Centralized Dashboard:** Harder to see trends, status of all reports, or history.
*   **Entry Identification:** Relies on users not altering the pre-filled entry identifiers in the WhatsApp message. Using `indonesia` + `amiyah_arab` is prone to ambiguity if multiple entries share these, or if these fields themselves are the subject of the error report. An `entry_uuid` would be much more reliable.
*   **Scalability:** Doesn't scale well if the volume of reports grows significantly.

This "WhatsApp-first" approach is a great way to start collecting feedback. You can always evolve to a more sophisticated system later if the volume of reports justifies the development effort.

For now, the most critical decision for implementation is how you'll identify the entry in the pre-filled message:
1.  `indonesia` + `amiyah_arab` (simpler, but less robust)
2.  A new, persistent `entry_uuid` (more effort to add to CSV and app, but much more reliable for tracking).

Given your current workflow of regenerating the SQLite DB, if you *can* add `entry_uuid` to your CSV and pass it to the client, I'd strongly recommend that for more accurate report tracking, even if it's just used for this WhatsApp message initially.
