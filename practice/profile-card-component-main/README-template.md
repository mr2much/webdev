# Frontend Mentor - Profile card component solution

This is a solution to the [Profile card component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/profile-card-component-cfArpWshJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

- Build out the project to the designs provided

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Styled Components](https://styled-components.com/) - For styles

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

For the first time ever, I managed to use the ``background`` property to set various stuff at the same time, like the images at the top and bottom as well as the background color. I had to read some documentation on MDN since I didn't want to google around code snippets on Stack Overflow. Positioning the images took me a few minutes and was not as straight forward as just setting ``left top`` or ``right bottom``.

Here's how I did it:

```css
background: left -90% top 60% / 75% no-repeat url("../images/bg-pattern-top.svg"),
    right -90% top -40% / 75% no-repeat url("../images/bg-pattern-bottom.svg"),
    hsl(185, 75%, 39%);
```

Positioning the image to look like the one in the example was a lot trickier than I thought, and despite my best efforts, I had to do some googling to see how it was done. At first I was trying to do some ``position: relative`` to set it relative to its parent container, as if trying to position the image between two divs, but then I realized that there was no other div in the first place. In the end, what I found didn't work because of the layout on the HTML, so I added another div, set the image as its background, and then another div with the information. Then it was only a matter of making the div with the image round, adding a bit of negative marging on the top, and then setting the image to occupy 100% of the space inside of the div. Here is the HTML:

```html
<!-- This is inside of a parent .card container -->
      <div class="heading"></div>
      <div class="main">
        <div class="img"></div>
        <div class="info">
          <p><span class="name">Victor Crest</span> 26</p>
          <p>London</p>
        </div>
      </div>
<!-- This is inside of a parent .card container -->
```

And here is the CSS:

```css
.card .img {
  border: 0.35em solid #fff;
  background: center / cover url("../images/image-victor.jpg");
  position: relative;
  top: -48px;
  border-radius: 100%;
  overflow: hidden;
  margin: 0 auto;
  width: 106px;
  height: 106px;
}
```


To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```
```css
.proud-of-this-css {
  color: papayawhip;
}
```
```js
const proudOfThisFunc = () => {
  console.log('🎉')
}
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
