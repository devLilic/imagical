import React, {useEffect, useState} from 'react';
import Checkbox from "@/Components/Checkbox";
import Input from "@/Components/Input";
import Label from "@/Components/Label";


export default function Article({article, changeSearchOption, onChangeOtherInputValue}) {
    const [search_by, set_search_by] = useState('slug')
    const [input_value, set_input_value] = useState('');
    const [disable_input, set_disable_input] = useState(true);

    function selectSearchOption(e, search_by){
        set_disable_input(search_by !== 'other')

        if (e.target.checked){
            set_search_by(search_by)
        }
        changeSearchOption(article.search_slug, search_by)
    }

    function on_other_value_change(e){
        set_input_value(e.target.value);
        onChangeOtherInputValue(article.search_slug, e.target.value)
    }

    return (
        <div className="mx-2 my-3 bg-blue-100 rounded-sm">
            <div className="w-full flex border border-blue-300 rounded-sm">
                <div className='w-7/12 px-2'>
                    <h3 className="py-2 font-bold">{article.search_slug} ({article.type})</h3>
                    <p className='mt-1'>{article.content}</p>
                </div>
                <div className="w-5/12 bg-white">
                    <div>
                        <Label className='flex justify-between items-center'>
                            <div className="p-2">{article.search_slug}</div>
                            <div className="px-2">
                                <Checkbox name={article.search_slug+"_slug"}
                                          checked={search_by === 'slug'}
                                          value={article.search_slug}
                                          handleChange={e => selectSearchOption(e, 'slug')}/>
                            </div>
                        </Label>
                        <Label className='flex justify-between items-center'>
                            <div className="p-2">{article.title}</div>
                            <div className="px-2">
                                <Checkbox name={article.search_slug+"_title"}
                                          value={article.title}
                                          checked={search_by === 'title'}
                                          handleChange={e => selectSearchOption(e, 'title')}/>
                            </div>
                        </Label>
                        <Label className='flex justify-between items-center'>
                            <div className="p-2 w-full">
                                <Input name={article.search_slug+"_input"}
                                    className="w-6/12 text-xs disabled:bg-gray-100"
                                       isDisabled={disable_input}
                                       value={input_value}
                                       handleChange={on_other_value_change}/>
                            </div>
                            <div className="px-2">
                                <Checkbox name={article.search_slug+"_other"}
                                          value={input_value}
                                          checked={search_by === 'other'}
                                          handleChange={e => selectSearchOption(e, 'other')}/>
                            </div>
                        </Label>
                    </div>
                </div>

            </div>
        </div>
    );
}
