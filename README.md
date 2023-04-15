# five-lines

In this kata your task is to refactor the code for a small game. When finished it should be easy to add new tile types, or make the key draw as a circle, so we can easily distinguish it from the lock. 

The code already abides by the most common principles "Don't Repeat Yourself", "Keep It Simple, Stupid", and there are only very few magic literals. There are no poorly structured nor deeply nested `if`s.

This is *not* an easy exercise.

# About the Game
In the game, you are a red square and have to get the box (brown) to the lower right corner. Obstacles include falling stones (blue), walls (gray), and a lock (yellow, right) that can be unlocked with the key (yellow, left). You can push one stone or box at a time, and only if it is not falling. The flux (greenish) holds up boxes and stones but can be 'eaten' by the player. 

![Screenshot of the game](game.png)

# How to Build It
Assuming that you have the Typescript compiler installed: Open a terminal in this directory, then run `tsc`. There should now be a `index.js` file in this directory.

# How to Run It
To run the game you need to first build it, see above. Then simply open `index.html` in a browser. Use the arrows to move the player.

# Thank You!
If you like this kata please consider giving the repo a star. You might also consider purchasing a copy of my book where I show a simple way to tackle code like this: [Five Lines of Code](https://www.manning.com/books/five-lines-of-code), available through the Manning Early Access Program.

[![Five Lines of Code](frontpage.png)](https://www.manning.com/books/five-lines-of-code)

If you have feedback or comments on this repo don't hesitate to write me a message or send me a pull request. 

Thank you for checking it out.

## chapter 3 

if 문은 함수의 시작에만 배치한다.  

## chapter 4

이넘 타입에서 동등성 또는 똥일성을 파악하는경우가 많은데 그것들을 객체로 감싸서 처리하는 방법을 소개하고있다.  
사소한 로직조차 객체로 감싸서 처리하는게 괜찮아보여서 나중에도 많이 사용할듯보인다.  

default 키워드가 필요한경우에만 switch 를 쓰는게 좋은데 일반적으로는 switch case 문은 멀리하자.(사실 안쓰기도했구...)

책의 저자는 추상클래스 쓰는것을 지양하라는데 이유는 인터페이스를 통해 개발자가 강제적으로 무언가하기를 원하기때문이다.  
나중에 어떤 기능이 수정되었을때 상속되었을경우 영향도를 제대로 파악하지 못할수도 있는데 그런점을 유의해서 말하는걸로 느껴졌다.  

## chapter 6

Getter, Setter 쓰지말라는건 항상 들어왔지만 어떻게 해야할지 몰랐었다.  
기존 방식이 풀기반 아키텍쳐이고 다른 방식은 푸시 기반 아키텍쳐가 있다.  
