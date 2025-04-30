'use client';

import { useLanguageStore } from '@/stores/language';

export function useTranslatedExperiences() {
  const { t } = useLanguageStore();

  return [
    {
      id: 1,
      role: t.about.experience.items.globo.role,
      company: t.about.experience.items.globo.company,
      period: t.about.experience.items.globo.period,
      description: [
        t.about.experience.items.globo.description[0],
        {
          main: t.about.experience.items.globo.description[1].main,
          items: [
            t.about.experience.items.globo.description[1].items[0],
            t.about.experience.items.globo.description[1].items[1],
            {
              text: t.about.experience.items.globo.description[1].items[2].text,
              subitems: [
                t.about.experience.items.globo.description[1].items[2].subitems[0],
                t.about.experience.items.globo.description[1].items[2].subitems[1],
                t.about.experience.items.globo.description[1].items[2].subitems[2],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      role: t.about.experience.items.ciandt.role,
      company: t.about.experience.items.ciandt.company,
      period: t.about.experience.items.ciandt.period,
      description: [
        t.about.experience.items.ciandt.description[0],
        {
          main: t.about.experience.items.ciandt.description[1].main,
          items: [
            {
              text: t.about.experience.items.ciandt.description[1].items[0].text,
              subitems: [
                t.about.experience.items.ciandt.description[1].items[0].subitems[0],
                t.about.experience.items.ciandt.description[1].items[0].subitems[1],
              ],
            },
            {
              text: t.about.experience.items.ciandt.description[1].items[1].text,
              subitems: [
                t.about.experience.items.ciandt.description[1].items[1].subitems[0],
                t.about.experience.items.ciandt.description[1].items[1].subitems[1],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      role: t.about.experience.items.agendaos.role,
      company: t.about.experience.items.agendaos.company,
      period: t.about.experience.items.agendaos.period,
      description: [
        t.about.experience.items.agendaos.description[0],
        t.about.experience.items.agendaos.description[1],
      ],
    },
  ];
}

export function useTranslatedEducation() {
  const { t } = useLanguageStore();

  return {
    id: 4,
    role: t.about.education.role,
    company: t.about.education.item.institution,
    period: t.about.education.item.period,
    description: [
      t.about.education.item.description[0],
      t.about.education.item.description[1],
      t.about.education.item.description[2],
    ],
  };
}

export function useTranslatedCardSkills() {
  const { t } = useLanguageStore();

  return {
    id: 5,
    role: t.about.languages.title,
    description: [t.about.languages.description[0], t.about.languages.description[1]],
  };
}
