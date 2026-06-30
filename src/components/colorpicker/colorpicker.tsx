import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import styles from "./colorpicker.module.css";
import {
  setElement,
  setSubElement,
  setColorEl,
  applyColorEl,
  addColorToPanel,
  deleteColorFromPanel,
  selectCurrentEl,
  selectCurrentSubEl,
  selectAllItems,
  selectColorsHistory,
  resetAllColors,
  addToLocalStorage,
  PropertyValue,
  ElementValue,
  setColorsPreset,
  selectColorsPresets,
  setApiStatus

} from "@store/catalog/colorPickerSlice";
import { useAppDispatch, useAppSelector } from "@services/hooks";
import { Button } from "@components/ui/button/button";
import Divider from "@components/divider/divider";
import clsx from "clsx";
import { Checkbox } from "@components/ui/checkbox/checkbox";

export const ColorPickerUI = () => {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState("#aabbcc");
  const currentEl = useAppSelector(selectCurrentEl);
  const currentSubEl = useAppSelector(selectCurrentSubEl);
  const items = useAppSelector(selectAllItems);
  const panelColors = useAppSelector(selectColorsHistory);
  const colorsPreset = useAppSelector(selectColorsPresets);

  const colorPickerHandler = (color: string) => {
    setColor(color);
    if (!currentEl) return;
    if (!currentSubEl) return;
    dispatch(setColorEl(color));
    dispatch(applyColorEl());
  };
  // ! написать код, если у массива 1 элемент проперти, то выбирать его
  const handleElementSelect = (element: string) => {
    dispatch(setElement(element as ElementValue));

    // Если выбран root - сразу выбираем bg
    if (element === 'root') {
      dispatch(setSubElement('bg'));
    }
  };
  //Получаем массив элементов из Redux
  const elements = items.map((item) => ({
    key: item.key,
    label: item.label,
  }));

  // ✅ Массив свойств для отображения
  const subElements = [
    { key: 'bg', label: 'BG' },
    { key: 'text', label: 'Text' },
    { key: 'blocks', label: 'Blocks' },
  ];
  // ✅ Получаем доступные свойства для текущего элемента
  const getAvailableProperties = () => {
    if (!currentEl) return ['bg'];

    const item = items.find((item) => item.key === currentEl);
    if (!item) return ['bg'];

    const props = ['bg'];
    if (item.property.text !== undefined) props.push('text');
    if (item.property.blocks !== undefined) props.push('blocks');
    return props;
  };

  const availableProps = getAvailableProperties();

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h1 className={styles.title}>Цветовая панель</h1>
        <Divider></Divider>
        <div className={styles.part}>
          <p className={styles.subtitle}>Выберите элемент:</p>
          <div className={styles.row} style={{ flexWrap: "wrap" }}>
            {elements.map((el) => (
              <Button
                key={el.key}
                size="small"
                onClick={() => handleElementSelect(el.key)}
              >
                {el.label}
              </Button>
            ))}
          </div>
        </div>

        <Divider></Divider>
        <div className={styles.part}>
          <p className={styles.subtitle}>Текущий элемент:</p>
          {currentEl && <span>{currentEl}</span>}
          {currentSubEl && <span>{currentSubEl}</span>}
        </div>
        <div className={styles.part}>
          <p className={styles.subtitle}>Выберите свойство:</p>
          <div className={styles.row}>
            {subElements.map((sub) => {
              const isAvailable = availableProps.includes(sub.key);
              const isActive = currentSubEl === sub.key;

              return (
                <Button key={sub.key} size="small" variant={isActive ? 'primary' : 'secondary'} onClick={() => {
                  if (isAvailable) {
                    dispatch(setSubElement(sub.key as PropertyValue));
                  }
                }}
                  disabled={!isAvailable}
                  className={!isAvailable ? styles.disabled : ''}
                >
                  {sub.label}
                  {!isAvailable && ' 🔒'}
                </Button>
              );
            })}
          </div>
        </div>

        <Divider></Divider>

        <div className={clsx(`${styles.row}`, `${styles.grid}`)} style={{ alignItems: "normal" }}>
          <HexColorPicker className={styles.HexColorPicker} color={color} onChange={colorPickerHandler} />
          <div className={styles.presets}>
            {panelColors.map((lastColor) => (
              <div key={lastColor}>
                <Button
                  variant="dot"
                  color={lastColor}
                  onClick={() => {
                    setColor(lastColor);
                    if (currentEl && currentSubEl) {
                      dispatch(setColorEl(lastColor));
                      dispatch(applyColorEl());
                    }
                  }}
                >
                </Button>
                <Button className={styles.deleteBtn} style={{ background: 'transparent', border: "none", }} onClick={() => dispatch(deleteColorFromPanel(lastColor))}>x</Button>
              </div>
            ))}
          </div>
          <Button className={styles.addColorBtn} onClick={() => dispatch(addColorToPanel(color))}>Добавить цвет на панель</Button>
        </div>

        <Divider></Divider>

        <div className={styles.part}>
          <p className={styles.subtitle}>Текущий цвет:</p>
          <div className={styles.row}>
            <div className={styles.inputColor} style={{}}>
              <input disabled type="color" onChange={() => colorPickerHandler} value={color} />
            </div>
            <div>
              {color}
            </div>
          </div>
          <Button size="small" onClick={() => colorPickerHandler(color)}>Применить текущий цвет</Button>
        </div>
        <div className={styles.part}>
          <div className={styles.presets}>
            <p className={styles.subtitle}>Готовые пресеты:</p>
            {colorsPreset.map((item) => (
              <div key={item.color}>
                <Button
                  variant="dot"
                  color={item.color}
                  onClick={() => { dispatch(setColorsPreset(item.color)) }}
                >
                </Button>
                {/* <Button className={styles.deleteBtn} style={{ background: 'transparent', border: "none", }} onClick={() => dispatch(deleteColorFromPanel(lastColor))}>x</Button> */}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.part}>
          <p className={styles.subtitle}>API данные:</p>
          <Checkbox onChange={() => { dispatch(setApiStatus()) }} />
        </div>
      </div>

      <div className={styles.row}>
        <Button onClick={() => { dispatch(addToLocalStorage()) }}>Сохранить</Button>
        <Button onClick={() => { }}>логи</Button>

        <Button onClick={() => {
          dispatch(resetAllColors());
          localStorage.removeItem("colorsDate")
    }}>Сбросить</Button>
      </div>
    </div>
  );
};
