import {Tag} from '@/types/Tag';
import React, {FC} from 'react';

type PropsType = {
    tags: Tag[]
}

const TagsList: FC<PropsType> = ({tags}) => {
    return (<>
        {tags.map(tag => (
            <span key={tag.id} className='px-2 text-xs text-gray-800
                                   bg-yellow-100 mx-1
                                   border border-yellow-500 rounded'>
                {tag.title}
            </span>))}
    </>);
};

export default TagsList;
