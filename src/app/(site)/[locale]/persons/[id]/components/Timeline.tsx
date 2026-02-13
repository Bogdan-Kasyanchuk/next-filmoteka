'use client';

import { useExtracted } from 'next-intl';
import { useMemo } from 'react';

import MediaCastCard from '@/components/ui/cards/MediaCastCard';
import MediaCrewCard from '@/components/ui/cards/MediaCrewCard';
import Title from '@/components/ui/typography/Title';
import { MediaCastMapper, MediaCrewMapper } from '@/types';

type Props = {
    cast: MediaCastMapper[],
    crew: MediaCrewMapper[]
};

function transformedData<T extends MediaCastMapper | MediaCrewMapper>(data: T[]) {
    const noDate: T[] = [];
    const withDate: T[] = [];

    data.map(item => {
        if (item.release_date) {
            withDate.push(item);
        } else {
            noDate.push(item);
        }
    });

    withDate.sort((a, b) => b.release_date!.getTime() - a.release_date!.getTime());
    return [ ...withDate, ...noDate ];
}

export default function Timeline(props: Props) {
    const t = useExtracted();
        
    const cast = useMemo(() => transformedData(props.cast), [ props.cast ]);
    const crew = useMemo(() => transformedData(props.crew), [ props.crew ]);

    const sections = [
        { title: t('Acting'), data: cast, prop: 'cast' },
        { title: t('Producing'), data: crew, prop: 'crew' }
    ] as const;

    return (
        <div className="p-person__timeline">
            <Title
                order="h3"
                variant={ 3 }
                className="p-person__timeline-title"
            >
                { t('Acting and producing career') }
            </Title>

            <ul className="p-person__timeline-list">
                {
                    sections.map(
                        section => (
                            section.data.length > 0 && (
                                <li
                                    key={ section.title }
                                    className="p-person__timeline-item"
                                >
                                    <p className="p-person__timeline-item-title">
                                        { section.title }
                                    </p>

                                    <ul className="p-person__timeline-item-list">
                                        {
                                            section.data.map(
                                                (item, index) => (
                                                    <li key={ index }>
                                                        {
                                                            section.prop === 'cast'
                                                                ? <MediaCastCard 
                                                                    cast={ item as MediaCastMapper }
                                                                />
                                                                : <MediaCrewCard
                                                                    crew={ item as MediaCrewMapper }
                                                                /> 
                                                        }
                                                    </li>
                                                ))
                                        }
                                    </ul>
                                </li>
                            )
                        ))
                }
            </ul>
        </div>
    );
}