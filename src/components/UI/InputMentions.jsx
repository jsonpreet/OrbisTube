import clsx from 'clsx'
import { useContext, useId } from 'react'
import { Mention, MentionsInput } from 'react-mentions'
import { GlobalContext } from '@context/app';
import { ProfilePicture } from '@utils/functions/getProfilePicture';

const InputMentions = ({ label, validationError, onFocus, onAdd, value, onContentChange, mentionsSelector, ...props }) => {
    const id = useId()
    const { orbis } = useContext(GlobalContext)

    const fetchSuggestions = async ( query, callback ) => {
        if (!query) return
        try {
            
            let { data: profiles, error } = await orbis.getProfilesByUsername(query);
            if (!error && profiles) {
                const channels = profiles.map((channel) => ({
                    id: channel.did,
                    did: channel.did,
                    username: channel.details.profile.username,
                    display: channel.details.profile.username,
                    picture: channel.details.profile.pfp,
                    details: channel.details
                }))
                callback(channels)
            }
        } catch {
            callback([])
        }
    }

    return (
        <label className="w-full" htmlFor={id}>
        {label && (
            <div className="flex items-center mb-1 space-x-1.5">
                <div className="font-medium text-sm">
                    {label}
                </div>
            </div>
        )}
        <div className="flex flex-col w-full">
            <MentionsInput
                id={id}
                className={mentionsSelector}
                value={value}
                placeholder={props.placeholder}
                a11ySuggestionsListLabel={"Suggested mentions"}
                onChange={(e) => onContentChange(e.target.value)}
                onFocus={(e) => onFocus(e)}
            >
                <Mention
                    trigger="@"
                    displayTransform={(handle) => `@${handle} `}
                    markup="@__display__ "
                    onAdd={onAdd}
                    renderSuggestion={(
                    suggestion,
                    _search,
                    _highlightedDisplay,
                    _index,
                    focused
                    ) => (
                    <div
                        className={clsx('max-h-52 flex w-full items-center truncate px-3 py-2 space-x-1 hover-primary', {
                        'dark:bg-[#fff]/[0.1] bg-gray-100': focused
                        })}
                    >
                        <ProfilePicture imgClass='w-8 h-8 rounded-full' details={suggestion.details}/>
                        <div className="overflow-hidden">
                            <p className="leading-4 truncate">
                                {suggestion?.display}
                            </p>
                        </div>  
                    </div>
                    )}
                    data={fetchSuggestions}
                />
            </MentionsInput>
        </div>
        {validationError && (
            <div className="mx-1 mt-1 text-xs font-medium text-red-500">
            {validationError}
            </div>
        )}
        </label>
    )
}

export default InputMentions