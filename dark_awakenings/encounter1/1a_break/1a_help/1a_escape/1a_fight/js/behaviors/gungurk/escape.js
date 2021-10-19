import { gameObj } from "../../1a_fight.js";

export function escape(gungurk) {
  attemptToEscapeGrapple(gungurk);
}

function attemptToEscapeGrapple(target) {
  // let damage = 10;
  let taintedRoot = target.grappledBy;

  console.log(
    `${target.name} is attempting to break free from the ${taintedRoot.name}${taintedRoot.uid}'s grasp!`
  );

  let actionParagrapm = document.querySelector(`#${target.id}`);

  actionParagrapm.innerHTML = `${target.name} attempts to escape from the ${taintedRoot.name}${taintedRoot.uid}'s grasp. `;

  const escapeCheck = grappleContest(target);
  const contestedCheck = grappleContest(taintedRoot);

  console.log(`${target.name}'s attempt is: ${escapeCheck}`);
  console.log(
    `${taintedRoot.name}${taintedRoot.uid}'s attempt is: ${contestedCheck}`
  );

  if (escapeCheck >= contestedCheck) {
    actionParagrapm.innerHTML += `And is successful to do so!`;

    console.log(`${target.name} broke free!`);
    target.condition = "healthy";
    taintedRoot.state = "attack";

    let distance = gameObj.getDistanceForCharacter(target);
    distance.feet += 5;
    actionParagrapm.innerHTML += ` ${target.name} immediately steps 5 feet away from the Chasm! ${target.name} is now ${distance.feet} away from the Chasm!`;

    console.log(`Immediately stepping 5ft away from the chasm!`);

    target.grappledBy = null;
    target.state = "attack";
  } else {
    console.log(`${target.name} failed to break free from the vine`);
    actionParagrapm.innerHTML += ` But is unable to do so.`;
  }
}

function grappleContest(contestant) {
  // check contestant's higher stat between Dexterity or Strength, or if it has proficiency in athletics
  let abilityCheck = 0;
  if (isStrengthHigherThanDexterity(contestant) || contestant.athletics) {
    abilityCheck = getAthletics(contestant);
  } else {
    abilityCheck = getAcrobatics(contestant);
  }

  // rolls a d20 and adds the ability check
  return Math.floor(Math.random() * 20 + 1) + abilityCheck;
}

function isStrengthHigherThanDexterity(character) {
  return (
    Math.max(character.strengthMod, character.dexterityMod) ===
    character.strengthMod
  );
}

function getAthletics(character) {
  // if character has proficiency in athletics
  if (character.athletics) {
    return character.strengthMod + character.proficiencyBonus;
  }

  return character.strengthMod;
}

function getAcrobatics(character) {
  // if character has proficiency in acrobatics
  if (character.acrobatics) {
    return character.dexterityMod + character.proficiencyBonus;
  }

  return character.proficiencyBonus;
}
