# Example Texts for Plagiarism Detection

Use these example texts to test the plagiarism detector and understand how semantic similarity works.

## Example Set 1: High Similarity (Expected >90%)

### Text 1 (Original)
```
Climate change is one of the most pressing issues of our time. Rising global temperatures are causing ice caps to melt, sea levels to rise, and extreme weather events to become more frequent. Scientists agree that human activities, particularly the burning of fossil fuels, are the primary cause of this environmental crisis.
```

### Text 2 (Paraphrased)
```
Global warming represents one of the most urgent challenges we face today. Increasing worldwide temperatures are leading to the melting of polar ice, rising ocean levels, and more frequent severe weather patterns. Researchers have reached consensus that human behavior, especially fossil fuel combustion, is the main driver of this ecological emergency.
```

## Example Set 2: Medium Similarity (Expected 60-80%)

### Text 3 (Related Topic)
```
Artificial intelligence is revolutionizing the way we work and live. Machine learning algorithms can now perform complex tasks that were once thought to be exclusively human. From medical diagnosis to financial trading, AI systems are becoming increasingly sophisticated and capable.
```

### Text 4 (Different Focus)
```
The rapid advancement of technology has transformed modern society. Computers and smartphones have changed how we communicate, learn, and conduct business. Digital innovations continue to reshape industries and create new opportunities for growth and development.
```

## Example Set 3: Low Similarity (Expected <50%)

### Text 5 (Completely Different)
```
The history of ancient Rome spans over a thousand years, from its founding in 753 BCE to the fall of the Western Empire in 476 CE. Roman civilization made significant contributions to law, engineering, architecture, and governance that continue to influence modern society.
```

### Text 6 (Another Different Topic)
```
Learning to cook is a valuable life skill that brings joy and satisfaction. Understanding basic techniques like chopping, sautéing, and seasoning can help you create delicious meals at home. Fresh ingredients and proper timing are key to successful cooking.
```

## Example Set 4: Plagiarism Detection (Expected >85%)

### Text 7 (Original Academic Content)
```
The photosynthesis process in plants involves two main stages: light-dependent reactions and light-independent reactions. During the light-dependent reactions, chlorophyll absorbs solar energy and converts it into chemical energy in the form of ATP and NADPH. The light-independent reactions, also known as the Calvin cycle, use this chemical energy to convert carbon dioxide into glucose.
```

### Text 8 (Plagiarized Version)
```
Photosynthesis in plants consists of two primary phases: reactions dependent on light and reactions independent of light. In the light-dependent phase, chlorophyll captures sunlight and transforms it into chemical energy as ATP and NADPH. The light-independent phase, called the Calvin cycle, utilizes this chemical energy to transform carbon dioxide into glucose.
```

## Testing Instructions

1. **Copy and paste** any combination of these texts into the plagiarism detector
2. **Adjust the threshold** to see how it affects clone detection
3. **Try different models** to compare their performance
4. **Observe the similarity matrix** to understand the relationships between texts

## Expected Results

- **Texts 1 & 2**: Should show very high similarity (>90%)
- **Texts 3 & 4**: Should show moderate similarity (60-80%)
- **Texts 5 & 6**: Should show low similarity (<50%)
- **Texts 7 & 8**: Should be flagged as potential plagiarism (>85%)

## Understanding the Results

### High Similarity (>80%)
- Likely plagiarism or paraphrasing
- Requires investigation
- May be acceptable if properly cited

### Medium Similarity (60-80%)
- Related topics or concepts
- May share common vocabulary
- Usually not plagiarism

### Low Similarity (<60%)
- Different topics or writing styles
- Original content
- No plagiarism concerns

## Tips for Testing

1. **Start with extreme examples** (identical vs. completely different texts)
2. **Test paraphrasing** to understand semantic detection
3. **Try different languages** (if models support it)
4. **Experiment with technical vs. general content**
5. **Compare short vs. long texts** to see performance differences 