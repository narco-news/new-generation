<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'
import { annotate, annotationGroup } from 'rough-notation'
useHead({
  title: 'About',
})

const infoCluster = ref(null)
const infoClusterIsVisible = useElementVisibility(infoCluster)

onMounted(() => {
  const infoClusterElement = document.querySelector('#infoCluster')
  const infoClusterAnnotation = annotate(infoClusterElement, { type: 'highlight', color: '#f6d982', iterations: 3, animationDuration: 1500, multiline: true })
  const makeSenseElement = document.querySelector('#makeSense')
  const makeSenseAnnotation = annotate(makeSenseElement, { type: 'bracket', brackets: ['left', 'right'], color: '#f06b84', iterations: 2, animationDuration: 2000, multiline: true })
  watchEffect(() => {
    const ag = annotationGroup([makeSenseAnnotation, infoClusterAnnotation])
    if (infoClusterIsVisible.value === true)
      ag.show()
  })
})
</script>

<template>
  <section>
    <p>
      <!-- Organizing and analyzing information will be one of the biggest modern challenges
    civilization face in the centuries ahead. Unimagined careers in the future will exist.
    Focused on interpreting digital visual and textual content. Carefully classifying it to
    achieve various objectives.
    <br />
    <br /> -->
      <strong>narco.news</strong> aims to be an information collective. An experiment blending traditional
      investigative journalism with the modern information landscape. Bringing together people
      of different perspectives, working towards further understanding. With the goal of
      providing an accurate depiction of what is going on. Aggregating from diverse sources to help ensure a comprehensive picture. We may not ourselves always understand the full
      story. But we will point you towards those who do.
      <span class="make-sense">Attempting to Make Sense of the Drug War</span>
    </p>
    <p id="makeSense" style="padding: 0.5em">
      The so-called war on drugs is a beast draped in myth and mystique. Sometimes looking
      like little more than a fairy tale.
      Bureaucrats, politicians, and the entertainment
      industry all holding significant influence on societal perceptions.
      The first yells
      it's important, and we should throw more money at it. The second barks it's urgent,
      and should terrify us. Hollywood mashing this all together into something far more
      grandiose than reality itself. Add to this the modern, continuously connected world
      we now live in. Yielding often an abundance of information. Not always though,
      allowing for disinformation and misinformation to run rampant. Altogether, making
      it difficult to decipher fact from fiction.
    </p>
    <p>
      <span ref="infoCluster" class="info-cluster">
        This is the <span id="infoCluster">information clusterfuck.</span>
      </span>

      While the drug war is in part about drugs, it's undeniable that's all it's about.
      Similarly, the participants in drug trafficking aren't solely delinquent fugitives.
      These aspects add to the confusion and false perceptions held by society.
    </p>
    <blockquote>
      "Drug trafficking, for example, is not the behavior of a daring, secretive, and clever operator; it is a complex international business system, deeply touching the lives of peasant farmers, political leaders in the nation's capital, or the highly competent business men and women who make the system go, and reap enormous profits from it. Therefore, in order for us to understand them, to perceive their broader meaning, they must be studied as systematic behavior, in the full context of their economic, political, and cultural aspects."
      <span>
        Martin, J. M., and A. T. Romano. <em>Multinational crime: Terrorism, espionage, drug and arms trafficking</em>. SAGE Publications, 1992.
      </span>
    </blockquote>
  </section>
</template>

<style lang="postcss" scoped>
section {
    display: grid;
    place-content: center;
    margin-top: 2em;
}
p {
  max-width: 65ch;
  color: var(--gray-2);
  z-index: 50;
  margin: 0em 1em;

  & span.info-cluster {
    display: block;
    width: max-content;
    margin: 2em 0;
    font-weight: 700;
    font-family: monospace;
    font-size: 16px;

    & #infoCluster {
      z-index: 10;
    }
  }

  & span.make-sense {
    display: block;
    width: 75%;
    font-weight: 600;
    font-size: 22px;
    font-family: serif;
    margin: 1em 0;
  }
}

strong {
  font-weighT: 700;
  color: var(--gray-1);
}

em {
  font-family: serif;
  font-style: italic;
}

h2 {
  font-weight: 600;
  font-size: 24px;
  margin: 1em 2em;
  color: var(--gray-4);
  align-self: flex-start;

  /* Small screens */
  @media (max-width: 425px) {
    margin: 1em 0;
    /* max-width: 90%; */
  }
}

blockquote {
  max-width: 65ch;
  border: 1px solid var(--blue-8);
  border-radius: 10px;
  padding: 1em;
  margin: 2em 0;
  font-style: italic;
  line-height: 1.5;

  & span {
    display: block;
    margin-top: 1em;
    font-style: normal;
    font-size: 14px;
  }

  /* Large screens */
  @media (min-width: 425px) {
    margin: 2em 3em;
  }
}

html.dark {
  & p {
    color: white;

    & span.info-cluster {
      & #infoCluster {
        color: #222;
      }
    }
  }

}
</style>
