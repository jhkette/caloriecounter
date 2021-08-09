import * as R from 'ramda'

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT',
  SAVE_MEAL: 'SAVE_MEAL',
  DELETE_MEAL: 'DELETE_MEAL',
  EDIT_MEAL: 'EDIT_MEAL',
};

// this function is called via dispatch 
// and handles wether to show form or not
export function showFormMessage(showForm){
    return {
        type: MSGS.SHOW_FORM,
        showForm
    }
}

export function mealInputMsg(description){
  return {
    type: MSGS.MEAL_INPUT,
    description
  }
}

export function caloriesInputMsg(calories){
  return {
    type: MSGS.CALORIES_INPUT,
    calories
  }

}

export function deleteMealMsg(id) {
  return {
    type: MSGS.DELETE_MEAL,
    id,
  };
}

export function editMealMsg(editId) {
  return {
    type: MSGS.EDIT_MEAL,
    editId,
  };
}


export const saveMealMsg = {type: MSGS.SAVE_MEAL  }


function update(msg, model) {
  switch(msg.type){
      case MSGS.SHOW_FORM: {
        const  {showForm} = msg
          return {...model, showForm, description: '', calories: 0}
      }
      case MSGS.MEAL_INPUT: {
        const {description} = msg;
        return {...model, description}
      }
      case MSGS.CALORIES_INPUT: {
        const calories = R.pipe(
          parseInt,
          R.defaultTo(0)
        )(msg.calories)
        return {...model, calories}
      }
      case MSGS.SAVE_MEAL: {
        const { editId } = model;
      const updatedModel = editId !== null ? 
        edit(msg, model) : 
        add(msg, model);
      return updatedModel;
      }
      case MSGS.DELETE_MEAL: {
        const { id } = msg;
        const meals = R.filter(
          meal => meal.id !== id
        , model.meals);
        return { ...model, meals };
      }
      case MSGS.EDIT_MEAL: {
        const { editId } = msg;
        // use find to get meal
        const meal = R.find(
          meal => meal.id === editId, 
          model.meals);
        // description and calories from meal
        const { description, calories } = meal;
  
        return {
          ...model, 
          editId, 
          description, 
          calories,
          showForm: true, 
        };
      }
  }
  return model
}

function add(msg, model) {
  const { nextId, description, calories } = model;
  const meal = { id: nextId, description, calories };
  const meals = [...model.meals, meal]
  return {
    ...model,
    meals,
    nextId: nextId + 1,
    description: '',
    calories: 0,
    showForm: false,
  };
}

function edit(msg, model) {
  const { description, calories, editId } = model;
  const meals = R.map(meal => {
    if (meal.id === editId) {
      return { ...meal, description, calories };
    }
    return meal;
  }, model.meals);
  return {
    ...model,
    meals,
    description: '',
    calories: 0,
    showForm: false,
    editId: null,
  };
}

export default update;
