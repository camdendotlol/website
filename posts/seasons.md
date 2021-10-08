---
title: 'The Seasons Update'
date: '2021-10-05'
imageURL: '/img/Antonio_Vivaldi.jpg'
quote: "Here I go with the timid little woodland creature bit again. It's shameful, but, uh, it's a living."
quoteAuthor: 'Bugs Bunny'
---

This website is now updated with season-specific themes, year-round. It's all client-side, so I won't need to manually change the theme for each season.

What this means is that, on the winter solstice, the background image for the homepage will change to a winter-themed picture, and that pleasant orange color will become wintery blue. On the spring equinox, these will change again to a flowery, springtime theme. And so on.

The implementation is pretty simple, but not as simple as I would like. Ideally, I would have stored the theme values entirely within CSS Variables, but NextJS's CSS module system doesn't support changing variables with JavaScript. So I use helper classes, with names such as `.fallBackground` and `.summerBackgroundContainer`.

When you load the homepage, this website runs a function called `getSeasonalTheme`. It checks the current date, compares it to the four dates of solstices and equinoxes, and returns an object. For example, here is what the client gets if it's spring:

```ts
{
  background: '/img/ruby-doan-BrFuaOEfxCk-unsplash.jpg',
  credit:
    `<p>
      cover photo from <a href = "https://unsplash.com/photos/BrFuaOEfxCk">Ruby Doan on Unsplash</a>
    </p>`
  ,
  textColor: styles.springText,
  backgroundColor: styles.springBackground,
  favicon: '/favicon-spring.png'
}
```

`styles` is imported from the `Home` CSS module (not ideal, because I also use these in the `Portfolio` component, but it works for now).

Here is an example of how I use the `seasonalStyle` object in the homepage's background image (behind the "My name is Camden" header). Normally this would be a `background-image` CSS property, but then I wouldn't be making use of NextJS's `Image` component, which automatically serves lower-bandwidth formats to browsers that support it. So I use an `Image` and add some CSS properties in the `backgroundImage` class to put it in the background.

```tsx
<Image
  src={seasonalStyle.background}
  className={styles.backgroundImage}
  alt='' // empty alt-text because the image is decorational background
  layout='fill'
  objectFit='cover'
  objectPosition='center'
  draggable='false'
/>
```

All the images are taken from Unplash, which has practically no restrictions and does not even require you to credit the photographer. But it's the nice thing to do. So I do this a bit lazily, by including a string in `seasonalStyle.credit` that can be turned into HTML.

```jsx
<div dangerouslySetInnerHTML={{ __html: seasonalStyle.credit }}></div>
```

`dangerouslySetInnerHTML` is, as the name implies, rather dangerous, because it renders whatever is in the string as an HTML node, which has limitless potential for maliciousness. But in this case it's okay because it's only setting hardcoded values, not accepting user input or relying on a third party.

Some components, like the blog you're looking at now, are not updated yet to support the new colors. As of this writing, links will change to the fall color when you hover over them. This will not change automatically when winter comes. I haven't figured out a good way to do this within NextJS's CSS module system. Most likely, I will someday refactor all the styles to use `styled-components` and then use the theme system built into that.