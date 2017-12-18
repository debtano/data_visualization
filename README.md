Summary 
-------

This visualization uses pre-processed data from the titanic-data.csv dataset. 
It its a follow up from my assignement on initial data exploration (https://github.com/debtano/explore_titanic).
At the time of that work i asked myself if some myths around the Titanic were visible through available data;
so i'd tried to understand demographic information: distribution of sex (survived and non survived), what about 
couples and couples with childrens all in terms of passenger class grouping.   

Design
------

To accomplished the aforementioned objective i decided to show in a visualization the relationship between 
passenger class (First, Second , Third) and the number of survived/non survived males, women, couples and childrens.

I decided to use dimple.js given the fact that i was planning to converge lot of information in the same visualization
so i tried to stay as much close as possible to the design choices and away from implementation details (d3 + svg.

Various visualization components come up to my mind and i followed some examples from dimplejs.org (see details on 
Resources section below) to extract the pieces for the whole visualization. 

In terms of general design decisions i could mention:

* A stacked bar chart seems to be a good representation given the fact that i wanted to shown the relationship between survived and non-survived on different series. So bar give me the ability to stack the sum of survived and non-survived for males, females and children and at the same time be able to show them in three different passenger classes.

* For the axis i choose to have the number of passengers -preprocessed by the preprocessing_titanic.py script to obtain nominal numbers for each category- in the "y" axis and a combined passenger class and demographic categorization on the "x" axis. I needed to show the demographic distribution per class and not all together which would be very confused. 

* After having decided to have three mayor categories on the "x" axis including each of them the three propossed demographics (males, females and children) i just need to adjust the default color schemes to distinguished the status (survived, non-survived) for every demographic category.

After the *first feedback* i decided to work on: re-arrange categorical data , add titles and sub-titles, choose better colors and/or backgrounds. 

To choose better colors combinations for i included dimple chart function "assignColor" that let you choose specific fill and stroke for a category. To re arrange the categorical data i needed to do two things : first i took my preprocessing_titanic.py and changed the Passenger Class names from two separated words ("First Class") to one word only schema ("First") since the legend of the axis already said Passenger Class. With that changed, i used dimple axis function "addOrderRule" to arrange alphabetically on class names. Lastly, for titles and subtitles i choose to follow a couple of examples from dimplejs.org advanced examples : 

http://dimplejs.org/advanced_examples_viewer.html?id=advanced_interactive_legends
http://dimplejs.org/advanced_examples_viewer.html?id=advanced_storyboard_control

So looking at the examples you'll see that the design decisions were to combine an "indicator" board to be able to choose the demographic to view -instead of puting legends inside the bars- and use that indicator bar as a "chooser" , using onClick events, to display the demographic bar. Away from the new chart (were i previously filtered the demographic options -male, female, couples, childre-) and the onClick event the rest of the new code is style manipulation since axis lines need to be hide, dimensions need to be adjusted for the indicator to fit into the initial svg, demographic categories legends adjusted to fit into the rects elements, etc.

After the *second feedback* i decided to work on: adjusting the legends of the indicator.

Most of the things mentioned in this feedback were corrected in the second version (re arrange of demographic categories so "First" class dont get in the middle and the inclusion of the indicator bar with legends that should help clarify intention) i just added an additional line to the indicator test as a Title "Titanic demographics", adjusted font size and weight to get bold effect. Colors were also adjusted given first feedback because they were naturally inverted (blue for non-survived and red for survived).

Given the feedback received *from my reviewer* and the below mentioned *third review* i have gone through the following changes:

1. Code separation : I have separated main html file (index.html) that includes link to a separated style file (css/style.css), source of the javascript/dimple code (js/titanic_viz.js) and div placeholders.

2. Title and description : based on the separation i mentioned in number 1 above, i have used div placeholders to include a title and an info paragraph above the main div used for the graph (the chartContainer). I used CSS style to allocate the placeholders in the body of the page and to control font size, style and background colors.

3. Categories definitions : after receiving a thrid feedback and feedback from my reviewer i found thar "couple" and "childre" were ambiguosly defined. Basically they correspond to sibsp and parch categories in the original datafile but sibsp required a different processing because it did not represent *only* couple but other family relations too. In the case of parch it was the case also that it did not mean *under aged male or female* -which was what i trying to represent- but its relationship to parents and sister or daughter relationship. So i decided to leave "couples" out of the visualization and to follow my reviewer in the recommendation of defining children as "10 years old or less" male or female.

Feedback
--------

https://gist.github.com/debtano/591679f6a4e03b8d8603838fef362945
https://bl.ocks.org/debtano/591679f6a4e03b8d8603838fef362945

First feedback i received:

_I notice that it seems that you are trying to show up a demographic study around the Titanic tragedy. I noticed that some information (like bar names)
It would be probably better to change the colors between survived and non survived and / or the shape or background of the bar
Is there a way to arrange the passenger class ? (First class is in the middle)
To finish, is there a way to rearrange the graphic so we, as users, can choose which information to visualize and compare ?_

Second feedback i received:

_It is not completely clear for me what are you trying to show. I find out some information on the bars about men, women, children survived and not survived but the lack of a title or a good reference confused me.
It seems that a different color combination also could help and probably the letter size of the axis references. First class category is in the middle is that correct?_

Feedback from my reviewer

_There are a few items that should be added to enhance the explanatory nature of this visualization:
add a narrative paragraph and/or descriptive title to give the reader context of what they are viewing
explain what a child is. What age range is this? As a tip, survival was best for < 10 years old._

_This is a nice explanation of the design process. To complete this section please explicitly describe:
color encodings, axis encodings, chart type and why it was used_

Third feedback received:

_I think the criteria used to define children is not clear enough. I mean, how can I know if you are refering to underage children or, for instance, even younger children. I suggest that range to be specified._


Resources
---------

+ From dimplejs.org i have reviewed the following examples:
	- http://dimplejs.org/advanced_examples_viewer.html?id=advanced_interactive_legends
	- http://dimplejs.org/advanced_examples_viewer.html?id=advanced_lollipop_with_hover
	- http://dimplejs.org/advanced_examples_viewer.html?id=advanced_waterfall
	- http://dimplejs.org/advanced_examples_viewer.html?id=advanced_bar_labels
	- http://dimplejs.org/advanced_examples_viewer.html?id=advanced_storyboard_control
+ https://github.com/PMSI-AlignAlytics/dimple
+ https://github.com/PMSI-AlignAlytics/dimple/wiki/dimple#filterData
+ https://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.plot
+ https://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#setStoryboard
+ https://www.kaggle.com/c/titanic/data