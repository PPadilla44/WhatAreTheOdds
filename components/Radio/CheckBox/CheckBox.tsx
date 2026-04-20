import React, { FC } from 'react'
import { CheckBox as DCheck } from "../../Themed"
import Colors from '../../../constants/Colors'

import Fonts from '../../../constants/Fonts'

interface Props {
    title: string;
    checked: boolean;
    setChecked: () => void;
}

const CheckBox: FC<Props> = ({ title, checked, setChecked }) => {
    return (
        <DCheck
            iconRight={true}
            title={title}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checkedColor={Colors.shared.primary}
            checked={checked}
            onPress={setChecked}
            containerStyle={{ backgroundColor: "transparent", borderColor: "transparent", paddingVertical: 14, paddingHorizontal: 16, marginLeft: 0, marginRight: 0 }}
            textStyle={{ fontSize: 16, fontWeight: checked ? "700" : "500", fontFamily: Fonts.bodyBold }}
            wrapperStyle={{ justifyContent: "space-between" }}
        />
    )
}

export default CheckBox
