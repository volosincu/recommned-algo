# txtanalyz.github.io


 ( demo <a href="https://volosincu.github.io/txtanalyz.github.io">link</a> )

This app uses a basic algorithm for searching patterns between a list of propositions. 

<p>For example bellow it's a pattern related with cats. Tree distinct activities related to cats. </p>
<ul>
  <li>"Claudia likes cats." <code> stative-verb - emotion </code></li>  
  <li>"I feed cats." <code> action-verb - nutrition</code></li>
  <li>"Childrens play with the cats." <code> action-verb - behaviour </code></li>
</ul>
<br/>

<p>Selecting a category like <code>nutrition</code> we are reordoning by a rank depending on the category of the <code>action (verb)</code> the propositions that match the actions from the <code>nutrition : eat, drink, tastes...</code> </p>
<br/>
 
<p> Dictionary by which propositions are search for any related meaning between 
their <code> objects (complements)</code> and the <code> actions (verbs)</code>
</p>
<code>
<pre>
"action-verbs" : {
	      nutrition: ["eat", "drink", "tastes", "feed"],
	      movement : ["walk", "go", "hiking", "run", "grow", "makes"],
	      behaviour : [ "play", "avoids" ]
},
"stative-verbs" : {
	    opinion : ["understand", "know", "tell"],
	    posession : ["have", "own"],
	    emotion : ["like", "hates", "fears", "dislike", "enjoy", "scary"]
}
    </pre>
</code>
