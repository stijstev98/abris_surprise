# AbriTime - A Special Surprise 💝

A beautiful, mobile-first interactive surprise project for your special someone!

## Features

- 🎨 **Beautiful Design**: Carefully crafted with a warm color palette and smooth animations
- 📱 **Mobile-First**: Optimized for all screen sizes, starting with mobile
- ✨ **Enhanced Animations**: Large headings with bouncy 3D slide-up animations and shimmer effects on buttons
- 🎥 **Video Surprise**: YouTube video integration with automatic fade to surprise image
- 💫 **Interactive Flow**: 5 questions with smooth progression and playful "No" responses
- 🎉 **Celebration Effects**: Floating hearts animation after the surprise reveal
- 🔧 **Fixed Layout**: Buttons stay perfectly positioned at the bottom, preventing layout jumps

## Setup

1. **Add Your Surprise Image**: Replace the placeholder by adding your `surprise.jpg` file to the root directory
2. **Update the Video**: A placeholder video ("You Are My Sunshine" cover) is included. In `script.js`, replace the `YOUTUBE_VIDEO_URL` with your chosen video:
   ```javascript
   const YOUTUBE_VIDEO_URL = "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=0&controls=0&rel=0&modestbranding=1&showinfo=0";
   ```
3. **Adjust Timing**: Update the `videoLength` and `fadeStartTime` variables in the `startSurpriseCountdown()` function to match your video's duration (currently set for ~3 minutes)

## Deployment to GitHub Pages

1. Push this project to a GitHub repository
2. Go to your repository's Settings
3. Navigate to "Pages" in the sidebar
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Your surprise will be live at: `https://yourusername.github.io/repository-name`

## Colors Used

- **Background**: `#eae0c5` (Warm cream)
- **Primary**: `#475b3a` (Forest green)
- **Secondary**: `white` (Button text)
- **Background Overlay**: `background.webp` at 8% opacity with multiply blend

## Typography

- **Headings**: Caprasimo (Google Fonts) - playful and distinctive, extra large for impact
- **Buttons**: Montserrat (Google Fonts) - elegant and modern sans-serif
- **Body**: Inter - clean and readable

## The Experience

1. **Question 1**: "Have you ever been called a 'Dinkle'?"
2. **Question 2**: "Is your birthday around this time?"
3. **Question 3**: "So you're the birthday girl huh?"
4. **Question 4**: "You're a cute girl named Abri, aren't you?"
5. **Question 5**: "Do you want a surprise?"

- Clicking **"Yes"** advances to the next question
- Clicking **"No"** shows a playful "I don't believe you..." message
- After the final "Yes", a video plays and fades to reveal the surprise image

## Customization

- **Questions**: Edit the heading text in `index.html`
- **Colors**: Modify CSS custom properties in `style.css`
- **Animations**: Adjust timing and effects in `style.css` and `script.js`
- **Video Duration**: Update timing in `script.js` based on your video length

## Technical Notes

- Uses modern CSS features (flexbox, animations, backdrop-filter)
- Responsive design with mobile-first approach
- Vanilla JavaScript for smooth performance
- YouTube iframe API for video integration
- Accessible with keyboard navigation support

Enjoy creating this special moment! 💕
