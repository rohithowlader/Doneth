function renderFoodRecipe() {
  var pre_genres = [
    '"' + "noodles" + '"',
    '"' + "omlette" + '"',
    '"' + "fruit salad" + '"',
    '"' + "pizza" + '"',
    '"' + "curry" + '"',
    '"' + "hotdog" + '"',
    '"' + "sandwich" + '"',
    '"' + "cake" + '"',
    '"' + "dumpling" + '"',
  ];

  var link1 = '"' + "https://www.swiggy.com/" + '"';
  var link2 = '"' + "https://www.zomato.com" + '"';

  var html =
    "<div class='content_block'>\
    <p class='summary_text' style='min-height: 10px; margin: unset;'>🍿 Find Food</p>\
    <div class='tab_section'>\
        <span class='movie_prompt' onclick='getSpecificFood(" +
    pre_genres[0] +
    ")'>🍝 Noodles</span>\
        <span class='movie_prompt' onclick='getSpecificFood(" +
    pre_genres[1] +
    ")'>🍳 Omlette</span>\
        <span class='movie_prompt' onclick='getSpecificFood(" +
    pre_genres[2] +
    ")'>🍉 Fruit Salad</span>\
        <span class='movie_prompt' onclick='getSpecificFood(" +
    pre_genres[3] +
    ")'>🍕 Pizza</span>\
        <span class='movie_prompt' onclick='getSpecificFood(" +
    pre_genres[4] +
    ")'>🥘 Curry</span>\
        <span class='movie_prompt' onclick='getSpecificFood(" +
    pre_genres[5] +
    ")'>🌭 Hotdog</span>\
        <span class='movie_prompt' onclick='getSpecificFood(" +
    pre_genres[6] +
    ")'>🍞 sandwich</span>\
        <span class='movie_prompt' onclick='getSpecificFood(" +
    pre_genres[7] +
    ")'>🍰 Cake</span>\
        <span class='movie_prompt' onclick='getSpecificFood(" +
    pre_genres[8] +
    ")'>🥟 Dumpling</span>\
  <span class='movie_prompt swiggy' onclick='window.open(" +
    link1 +
    ")'>🧡 Swiggy </span>\
  <span class='movie_prompt zomato' onclick='window.open(" +
    link2 +
    ")'>🍅 Zomato</span>\
    </div>\
<br/>\
    <p class='summary_text' style='min-height: 10px; margin: unset;'>Look for more</p>\
        <textarea id='food_recommender' class='input_box_big' rows='4' cols='50' placeholder='What do you want to eat?'></textarea>\
    <button class='intent_button' onclick='renderFoodRecipe()'>Reset</button><button class='intent_button' id='food_recommend_button' onclick='findRecipe()'>Find Food ideas</button>\
     \
    </div>";

  document.getElementById("modal_content").innerHTML = html;
}

function findRecipe() {
  var input = document.getElementById("food_recommender").value;

  document.getElementById("food_recommend_button").innerHTML =
    "🍜 searching for recipes . . .";

  var url =
    "https://api.openai.com/v1/engines/davinci-instruct-beta/completions";

  var return_value = "";

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", Openai_key);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);

      return_value = JSON.parse(xhr.responseText).choices[0].text;

      var html =
        "<div class='content_block'>\
        <p class='summary_text'>" +
        return_value +
        "</p>\
    <button class='intent_button' onclick='renderFoodRecipe()'>Reset</button>\
     <br/><br/>\
     </div>";

      document.getElementById("modal_content").innerHTML = html;
    }
  };
  var data = {
    prompt: input,
    temperature: 0.0,
    max_tokens: 120,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  console.log(data);

  xhr.send(JSON.stringify(data));
}

function getSpecificFood(param) {
  
  var url =
    "https://api.openai.com/v1/engines/davinci-instruct-beta/completions";

  var return_value = "";

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", Openai_key);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);

      return_value = JSON.parse(xhr.responseText).choices[0].text;

      var html =
        "<div class='content_block'>\
        <p class='summary_text'>" +
        return_value +
        "</p>\
    <button class='intent_button' onclick='renderFoodRecipe()'>Reset</button>\
     <br/><br/>\
     </div>";

      document.getElementById("modal_content").innerHTML = html;
    }
  };
  var data = {
    prompt: "Q: How to roast eggplant?\nA:How do you cook eggplant in the oven? Well, there are a couple ways. To roast whole eggplants in the oven, leave the skin on and roast at 400 degrees F (200 degrees C) until the skin gets wrinkly and begins to collapse in on the softened fruit. This method will also produce velvety smooth eggplant dips or spreads.\nQ:How to bake eggplant?\nA:To bake eggplant, you'll cut the eggplant into rounds or strips and prepare them as the recipe indicates -- for example, you can dredge them in egg and breadcrumbs or simply brush them with olive oil and bake them in a 350 degree F oven.\nQ:How to make puerto rican steamed rice?\nA:Bring vegetable oil, water, and salt to a boil in a saucepan over high heat. Add rice, and cook until the water has just about cooked out; stir. Reduce heat to medium-low. Cover, and cook for 20 to 25 minutes. Stir again, and serve. Rice may be a little sticky and may stick to bottom of pot.\nQ:how to make oatmeal peanut butter cookies?\nA:Preheat oven to 350 degrees F (175 degrees C). In a large bowl, cream together shortening, margarine, brown sugar, white sugar, and peanut butter until smooth. Beat in the eggs one at a time until well blended. Combine the flour, baking soda, and salt; stir into the creamed mixture. Mix in the oats until just combined. Drop by teaspoonfuls onto ungreased cookie sheets. Bake for 10 to 15 minutes in the preheated oven, or until just light brown. Don't over-bake. Cool and store in an airtight container.\nQ:How to make tomato soup?\nA:Tomato soup is one of the easiest soups to prepare. It consists of just a few ingredients that are simmered together for a short time.In a large saucepan, saute the onion, celery, and garlic in olive oil. Add the water, tomatoes, basil, oregano, pepper and salt. Bring to a boil, reduce heat, and simmer for 20 minutes.\nQ:How to make vegan mashed potatoes?\nA:Peel and cut the potatoes into a large pot of water. Add salt and bring to a boil. Cook for about 15-20 minutes or until fork tender. Drain the potatoes and set aside to cool.In a large bowl, mash the potatoes. Add the margarine and vegan milk and mash until the desired consistency. Add salt, pepper, and garlic powder to taste.\nQ:How to make a vegan sour cream?\nA:In a bowl, mix together soy milk, vinegar, and lemon juice. Stir until thoroughly combined. Add the vegan yogurt and stir. Add salt and pepper to taste.\nQ:How to make vegan cheese?\nA:Vegan cheese is a dairy-free version of cheese that is made from a variety of soy, rice, or other plant-based \"milks.\" The ingredients are combined with a coagulant to form a curd, which is then pressed into a cheese shape.\nQ:How to make vegan macaroni and cheese?\nA:In a pot, bring the water and 2/3 of the vegan butter to a boil. Add the macaroni and cook for 8-10 minutes or until tender. Drain the macaroni. In a medium saucepan over medium-high heat, melt the vegan butter. Add the flour and whisk until the mixture turns white. Stir in the soy milk and whisk until the mixture thickens. Add the hot sauce, paprika, salt, pepper, and nutritional yeast. Whisk until the mixture is smooth and the sauce has thickened. Remove from the heat and stir in the cheese until melted. Add the cooked and drained macaroni and stir to combine.\nQ: How to make "+param+"\nA:",
    temperature: 0.6,
    max_tokens: 540,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["\n"],
  };
  console.log(data);

  xhr.send(JSON.stringify(data));
}
