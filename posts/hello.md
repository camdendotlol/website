---
title: 'I Made a Website'
date: '2021-05-19'
imageURL: '/img/alexandria.jpg'
quote: "What if I told you/I feel like I know you?/But we never met/It's for the best"
quoteAuthor: 'Phoebe Bridgers'
---

Welcome to my new website. This is the first site I've made with Next.js, and I made it in a few days after bootstrapping with the [official Next.js tutorial](https://nextjs.org/learn/basics/create-nextjs-app) as starter code. The code is pretty sloppy with quite a few DRY violations and redundant CSS.

(Note: Some of the design choices described below are outdated after later updates.)

I had some misgivings about using a full SPA suite [for reasons of performance and loading speed](https://danluu.com/web-bloat/). Next.js almost seems like a parody of web development trends - a framework on top of React, which is itself a massive framework that swells your modules folder to thousands of files on a fresh install. That said, if you're going to go the maximalist route, you might as well go [all the way](https://en.wikipedia.org/wiki/Gravity%27s_Rainbow). Since part of this site's audience is potential employers, the wow factor is useful. So anyway, that's why the homepage loads a 2.9MB video.

Although my favorite CSS framework is [Bulma](https://bulma.io/), I decided not to use one at all for this site. I'm at the level of experience with Bulma where I am acutely aware of its limitations and the workarounds needed to overcome its quirks. On top of this, CSS frameworks tend to box you into their design style. Making a framework-based design look unique can be as much work as writing CSS from scratch.

For the non-blog parts of the site, I chose [Inter](https://fonts.google.com/specimen/Inter) for a bold sans-serif typeface. This is the same one that [Vercel](https://vercel.com), the developers of Next.js, use on their homepage.

The blogposts themselves use a serif typeface. Serif fonts used to be considered suboptimal for digital screens because the low pixel density would cloud up the serifs. With the increase in use of HiDPI and retina displays - which covers nearly all phones in the world, as well as many computers - screens today can better replicate the analog smoothness of paper. I chose [Newsreader](https://fonts.google.com/specimen/Newsreader), which has a nice old-school appearance.

Finally, the code snippets that appear in posts use [Anonymous Pro](https://fonts.google.com/specimen/Anonymous+Pro). This was a difficult decision, because my code font of choice - [Input Sans](https://djr.com/input/) - is only freely licensed for personal non-published use. Someday maybe I'll even buy the $5 license to use it on here. It's just that much better than any other code-editing font. Anonymous Pro looks great on a HiDPI screen, but has a mildly pixelated appearance on a lower-density display. I don't think it's a big deal if code snippets look pixelated.

I've never enjoyed having to constantly scroll while reading an article, so text display is fairly dense compared to sites like Medium, and there's no floating navbar or popup to take away screen real estate. Dense line spacing can feel claustrophobic on articles with small paragraphs like this one. But I anticipate that most of my posts will be about books I read and I prefer longer paragraphs for non-technical writing.

Every blog post contains a header image and a relevant quote. Posts certainly feel like they have high production quality this way.

As stated above, this site's code is pretty sloppy, but it's [on GitHub](https://github.com/mythmakerseven/website) if you want to check it out.
