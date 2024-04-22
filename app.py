from wordcloud import WordCloud
import matplotlib.pyplot as plt

# Input text for the word cloud
text = "Streamlined test-taking experience Instant feedback on performance Opportunities to practice Access to educational resources Motivating features"

# Generate the word cloud
wordcloud = WordCloud(width=800, height=400, background_color='white').generate(text)

# Display the word cloud using Matplotlib
plt.figure(figsize=(10, 5))
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis("off")
plt.show()
