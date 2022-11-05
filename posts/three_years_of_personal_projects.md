---
title: 'Three Years of Personal Projects'
date: '2022-10-26'
imageURL: '/img/construction.jpg'
quote: "You got a nine-to-five, so I'll take the night shift/And I'll never see you again, if I can help it"
quoteAuthor: 'Lucy Dacus'
draft: true
---

Recently someone told me they visited my blog. It took me a minute to remember I had one.

## The First Year

I created this website to help show off my projects and technical knowledge during my job search in 2021 and, like most of my personal projects at the time, I abruptly abandoned it the moment I recieved a job offer in early December.

In the course of 2021, I created a [book club platform](https://github.com/camdendotlol/groupread), a [polling site](https://github.com/camdendotlol/chromapoll), an unfinished [digital humanities project about the Linear A script](https://github.com/camdendotlol/linear-a), a [link aggregator](https://github.com/camdendotlol/links), and a couple iterations of my personal website.

In retrospect, that collection covers a lot of ground. Only one - the link aggregator - began as a tutorial, and the rest were original ideas developed from scratch. But if you look under the surface, the tech stack was the same for every single one: they are all single-page React apps. Coming from the excellent [Full Stack Open](https://fullstackopen.com/en/) course, which I took in late 2020, I knew that React was my strongest skill and I tightly focused my portfolio to show that off. I A/B tested to identify the ones that resulted in more interviews and wrote retrospectives to explain what I learned.

Then I found a job.

I took Groupread out back with the shotgun right away - the monstrosity was in the throes of three half-finished migrations (1. Sequelize to some other ORM, 2. JavaScript to TypeScript, 3. `.css` files to `styled-components`). I kept Chromapoll in maintenance mode until the domain expired a couple months back, but never made significant changes to it. I haven't touched the digital humanities site about Linear A. I don't remember when I killed the link aggregator. The only reason this personal site is still around is that I haven't got around to replacing it.

## The Second Year

Having a job dramatically changes what's important in personal projects. I don't need to show off skills. I spend eight hours a day working with (mostly) Rails and React, so the odds are pretty slim that I'd want to make something with the same stack in my free time.

Now that my personal projects are driven more by curiousity than practicality, I lean toward technologies I don't use every day: programming languages such as Rust and Lisp dialects, game development, desktop and command line applications, and functional programming.

### voyagerstatus

During my short period of lame duck unemployment, I decided to dive into shell scripting with [voyagerstatus](https://github.com/camdendotlol/voyagerstatus), which calculates and displays how far the two Voyager probes are from the Sun (the calculation is incorrect, a known bug). There is something nice about developing a CLI application, no matter how small. Even though I'm a web developer, I can see why some people use hipster tiling window managers and stare at terminals all day. A picture may be worth a thousand words, but a line of text can conjure a million pictures.

### Web Server Exploration

After learning some basic system administration skills at work, I looked into the Assembly-based web servers [rwasa](https://2ton.com.au/rwasa/) and [asmttpd](https://github.com/nemasu/asmttpd). I served a static HTML page at a test domain and was surprised at how quickly it loaded. If I ever need a high-performance web server (the odds of that are very low), I would probably use something Rust-based and fully-featured like Actix Web.

### The Script Decipherment Project

Speaking of which... my on-again-off-again project this year has been a still vaguely envisioned application that provides a set of tools for deciphering undeciphered scripts such as Linear A and the Indus Valley script. The basic idea is:

* provide all relevant immutable data out of the box (text corpi, transcriptions, etc.)
* provide a set of tools for making annotating, connecting, and creating annotated connections between records

This concept was inspired by the work of Alice Kober, the researcher who laid significant groundwork for deciphering the Minoan Linear B script. In the days before easy-to-use computers, Kober built an analog database of index cards and notebooks to find patterns in the script. I expect that a similar approach will lead to the decipherment of other scripts in the future and I want to create a purpose-built tool to enable that type of work.

The project began as a website (of course) hosted by Actix Web. I wanted the frontend to be as lean as possible, so I found an old-school templating engine whose name I forget, though it may have been Askama. It turned out that using a templating engine with a modern web server like Actix is a huge pain. The world has thouroughly moved on to JSON-based APIs.

I decided that the best frontend option that would be easy for me to build was React. But, of course, I'm not going to spend my free time doing the same type of work I do at my job. So I mixed things up a bit by making it a desktop application. Electron is boring, so I searched a bit and found [Tauri](https://tauri.app). Tauri is similar to Electron in that it lets you create pseudo-desktop applications that run in a webview, but has a couple differences that appealed to me:

* Electron bundles Chromium with your application; Tauri uses the system webview
* Electron runs with a Node backend; Tauri uses Rust

There are clear drawbacks here:

* System webviews give up some of the platform-neutrality that is one of Electron's main selling points
* Rust is a lot harder to write than JavaScript and the memory-safety benefits of Rust aren't very important for the script project

But I enjoy the benefits of smaller bundle size, lower memory usage, and the fact that Tauri offloads the browser security responsibility onto the operating system.

The problem at this point is that I still haven't got much work done. The main blocker isn't technical, it's that I need more domain knowledge. There are several books I will need to read about Kober's work and comparable work on other scripts before I can proceed further with creating features.

### Games

I also explored making computer games. A couple years ago I got a good way into the tutorial for Amethyst, then the premier Rust-based game engine. When I went back to it this year, I found that development dried up and they shut down the project. This type of thing is typical for the Rust ecosystem, and remains my biggest pain point in using Rust.

The premier Rust-based game engine for 2022 is [Bevy](https://bevyengine.org). Compared to what I remember of Amethyst, Bevy is quite a bit easier to work with. I started making a basic game called [Robot Attack](https://github.com/camdendotlol/robot-attack), in which the protagonist, who is absolute-positioned at the center of the screen, is attacked by malicious `Robot` and `Bug` Bootstrap Icons from each of the four sides of the window.

Eventually I needed to implement collision detection to tell when the player's bullet hits a robot or bug. I found this to be challenging - there is a physics engine crate that can handle collisions, but also seems to apply gravity to every entity, so the player and all opponents fall comically to the bottom of the window as soon as the game launches. I found a way to disable this gravity for each inidividual entity, but the bullets still fall to the bottom of the window - not what I want for a top-down view!

When I checked the documentation for the physics engine, I was overcome by the stench of calculus. I still want to return to this project eventually.

## The Third Year

You may have picked up by now that the third year is 2023. I wanted to outline my goals for this coming year with the understanding that they might change as the year progresses.

My top priority will be the research required to complete my script decipherment application. But there are a few new domains I want to explore.

### The *n*-body Problem

For all we know about the universe, we still can't look at three celestial objects and predict how they're going to move.

The *n*-body problem has stumped some of the brightest astrophysicists, mathematicians, et al. for centuries. It doesn't seem too difficult at first, so it has a way of suckering smart people into trying to solve it. I'm not that ambitious. I just want to write an *n*-body simulation, probably as a web app, but maybe as a desktop application using Bevy. These models have been done plenty of times before, but it still sounds fun to write one myself. I would like to do *something* different in my implementation to stand out from the others, but I don't have any specific ideas yet.

Maybe I will attempt to write it entirely using CSS.

### Lisp, Haskell, and Computer Science Fundamentals

I've mentioned above that I like Lisp, but I haven't started any significant projects with it. I've added *Structure and Interpretation of Computer Programs* to my 2023 reading list and I hope it will jump-start a Lisp hobby.

In a similar vein, I explored Haskell a while back, but the online course I was taking left me stumped after the first few sections. I hope that I can go back into it as a more experienced developer and actually complete the exercises.

Common Lisp and Haskell look cool on their own, but they're also windows into a world that I've barely inhabited so far. As a self-taught developer, I don't actually know a whole lot of computer science concepts. I've learned about the stack and the heap in bits and pieces and I'm vaguely aware of the N+1 problem. For the most part, the tools I've used professionally abstract away all the CS stuff and let you focus on the application logic in a higher-level manner.

There must be a lot of people in the opposite situation as me - people who painstakingly studied algorithms for four years and went on to be Ruby/JavaScript/Python developers who never use the lower-level concepts they learned in college.

It's likely, too, that I will learn some of these concepts and never use them. But I want to know how the web apps I make are working on the lower level, even if I rarely dip into it.

### Existing Projects

I want to continue my work on the script decipherment toolset, although I expect that this will involve a lot of non-technical research before I can make much progress on the appliction itself.

The video game projects may or may not continue. In recent years I've found myself enjoying more challenging and drier materials than video games, and this may end up being the case on the development side too. In particular, I still don't have any specific idea of which game I want to make. Most gamers have dozens of games ideas floating around that they wish they had the skills to make. The fact that I do not have ideas may be a sign that I won't enjoy pursuing game development.
