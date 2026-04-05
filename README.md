# psych. 🧠
### *Bridging the gap between Computational Logic and Human Behavior.*

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

**psych.** is a high-fidelity, minimalist web application designed for standardized psychometric assessment. Developed by a **B.Tech CS student with a minor in Psychology**, this platform serves as a technical proof-of-concept for how modern UI/UX can improve the accuracy and engagement of clinical self-reporting.

---

## 💎 The Flagship: TIS-40 (Trauma Integration Scale)
**Developed and Authored by [Aryan R]**

The **TIS-40** is the centerpiece of this application—an original 40-item psychometric instrument designed to measure how individuals integrate difficult life experiences into their current identity. Unlike standard trauma checklists that focus solely on symptom severity, the TIS-40 evaluates the **degree of integration** across four distinct clinical domains:

* **Memory Intrusion:** The frequency and intensity of involuntary recall.
* **Emotional Numbing:** The presence of dissociative barriers or "fogginess."
* **Nervous System Hyperarousal:** Physical "bracing" and startle responses.
* **Self-Perception:** The impact of past events on self-worth and future outlook.

*The scale utilizes a dynamic scoring algorithm that accounts for both positive indicators and reverse-scored avoidance behaviors.*

---

## 🛠️ The Assessment Inventory
In addition to the TIS-40, the app includes several industry-standard scales:

| Module | Focus Area | Scoring Logic |
| :--- | :--- | :--- |
| **TIS-40** | Trauma Integration | Dynamic Reverse Scoring (0-160) |
| **GAD-7** | Generalized Anxiety | Clinical Thresholds (0-21) |
| **PHQ-9** | Depressive Baseline | Suicidality Flagging & Severity |
| **BFI-10** | Personality (OCEAN) | Normalized 5-Point Likert Scale |
| **RIASEC** | Career Interests | Binary Holland Code Mapping |
| **ASRS v1.1** | Adult ADHD | Predictive Clinical Markers |
| **EPQ-R** | Temperament (PEN) | Eysenck PEN Matrix Calculation |

---

## 🏗️ Technical Architecture
Built with a **Vanilla-Plus** philosophy—leveraging the power of the DOM and Modern CSS to achieve a lightweight, 100-score performance audit.

* **Automated Reverse Scoring:** An integrated string-matching algorithm that detects `[REVERSE]` tags in question arrays and flips Likert values programmatically before calculation.
* **Context-Aware UI:** A specialized engine that swaps between a custom-styled Slider UI (for Likert scales) and a Binary Toggle UI (for EPQ/RIASEC) based on test metadata.
* **Ambient UX:** Glassmorphic design and "Ambient Aurora" motion to lower user anxiety during high-sensitivity testing.

---

## 🧬 Engineering meets Psychology
This application reflects the principles of **Item Response Theory (IRT)**. Every question is treated as a specific weight in a larger psychological profile.

### Mathematical Foundation:
The app is designed with the potential to implement the **Two-Parameter Logistic (2PL)** model, where the probability $P(\theta)$ of a trait manifestation is calculated as:

$$P(\theta) = \frac{1}{1 + e^{-a(\theta - b)}}$$

*(Where $a$ is the item discrimination factor and $b$ is the item threshold).*

---

## 🔮 Future Roadmap: Digital Psychology
The following features are planned to further the intersection of CS and Psych:

* **Radar Chart Visualizations:** Integrating Chart.js to provide users with a visual "Psychological Fingerprint" for the OCEAN and PEN models.
* **Factor Analysis Integration:** Moving from simple cumulative scoring to weighted scoring based on statistical factor loading.
* **EMA (Ecological Momentary Assessment):** Transforming the app into a Progressive Web App (PWA) to allow users to track psychological states in "real-time" throughout the day.
* **Longitudinal Analytics:** Implementing local storage encryption to allow users to see their progress over weeks or months of recovery and integration.

---

## 🕹️ How to Use
The **psych.** platform is designed for a frictionless, "Flow State" user experience.

1.  **Initialize the Core:** Click the **"Enter Workspace"** button to transition from the ambient intro screen to the assessment dashboard.
2.  **Select a Module:** Choose from the grid of validated scales. Note that high-sensitivity modules (like the TIS-40) will trigger a mandatory ethical disclaimer before beginning.
3.  **Responsive Assessment:**
    * **Likert Scales:** Use the fluid slider to indicate frequency or agreement. The UI dynamically rounds continuous input to discrete integers for scoring accuracy.
    * **Binary Inventories:** For EPQ-R or RIASEC, use the high-contrast **Yes/No** toggles for rapid-fire interest mapping.
4.  **Real-Time Progress:** Monitor the top-mounted progress bar to maintain engagement throughout longer inventories.
5.  **Analyze Results:** Upon completion, the engine runs a localized calculation script to provide immediate categorical insights and clinical descriptions.

---

## ⚖️ Clinical & Ethical Disclaimer
> **IMPORTANT: PLEASE READ CAREFULLY**

**1. Not a Diagnostic Tool**
This application is provided for educational and self-screening purposes only. The results generated by **psych.** (including the TIS-40, PHQ-9, and GAD-7) do not constitute a clinical diagnosis. A formal diagnosis for any mental health condition can only be provided by a licensed psychiatrist or clinical psychologist following a comprehensive diagnostic interview.

**2. Accuracy of Self-Reporting**
Psychometric instruments are subject to self-report bias. Factors such as social desirability, current mood state, and environment can influence results. Scores should be viewed as a "snapshot in time" rather than a permanent trait.

**3. Data Privacy & Sovereignty**
To ensure maximum user privacy, this application operates on a **Zero-Server architecture**. No personal data or test responses are transmitted to an external database; all calculations are performed locally within your browser session. Once the tab is closed, all session data is purged.

**4. Emergency & Crisis Protocol**
If you are experiencing a mental health crisis, or if this application triggers significant distress, please seek immediate professional assistance.
* **India:** Vandrevala Foundation (1860-2662-345) or AASRA (9820466726).
* **Global:** Please contact your local emergency services or a crisis hotline.

---

## 🤝 Contributing to psych.
**psych.** is an interdisciplinary open-source project. We welcome contributions from both **Software Engineers** and **Psychology Researchers** to help refine the intersection of technology and mental health.

### 🛠️ For Developers (CS/IT)
* **Data Visualization:** Implementation of D3.js or Chart.js to create radar/spider charts for OCEAN and PEN models.
* **PWA Support:** Converting the app into a Progressive Web App for offline clinical use and mobile accessibility.
* **State Management:** Transitioning from global variables to a more robust state management system.
* **Animation Refinement:** Enhancing the "Ambient Aurora" background with WebGL or Three.js.

### 🧠 For Researchers (Psychology/Behavioral Science)
* **Instrument Validation:** Proposing new standardized scales (e.g., Dark Triad, MBTI-alternative).
* **Scoring Logic:** Enhancing the `calculate` functions with weighted factor loading or normative data comparisons.
* **TIS-40 Feedback:** Providing peer review or data-driven suggestions for the refinement of the TIS-40 items.
* **Ethical Review:** Ensuring all instructions maintain a high standard of clinical empathy and safety.

---

## 🚀 How to Contribute

1.  **Fork the repository** and create your feature branch:
    ```bash
    git checkout -b feature/AmazingFeature
    ```
2.  **Add a New Test:** To add a module, simply append a new object to the `testsData` array in `app.js` following the established schema.
3.  **Commit your changes:**
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```
4.  **Push to the branch** and open a **Pull Request**.

---

**Developed with 🤍 by [Aryan R]**
*B.Tech Computer Science | Minor in Psychology*
