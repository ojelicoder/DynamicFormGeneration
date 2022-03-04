import './form.scss';
import { GET_FORMDATA } from '../../core/utils/requests';
import { useEffect, useState } from 'react';
import Toast from '../../components/Toast';

const Form = () => {
    const [constraint, setConstraint] = useState({}),
    [arrayForm, setArrayForm] = useState([]),
    [innerMostCols, setInnerMostCols] = useState([]),
    [innerMostRows, setInnerMostRows] = useState([]),
    [errorToast, setErrorToast] = useState(false),
    [successToast, setSuccessToast] = useState(false);

    useEffect(() => {
        GET_FORMDATA().then(response => {
            const data = response.data.roster_constraints[0];
            setConstraint(data.constraint);
            setArrayForm(data.table_data.array_form);
            console.log(data.table_data.array_form)
            setInnerMostCols(data.table_data.innermost_table_cols);
            setInnerMostRows(data.table_data.innermost_table_rows);

            const tableSecondTabs = document.querySelectorAll('.table-tabs .table-tabs_item:last-child');
            tableSecondTabs.forEach(item => {
                item.classList.add('active')
            })
        }).catch(err => {
            console.error(err.toString())
        });
    }, []);

    const selectTab = (e, index) => {
        const tableTabs = document.querySelectorAll('.table-tabs .table-tabs_item');
        tableTabs.forEach(item => {
            item.classList.remove('active')
        })

        const allInputs = document.querySelectorAll('input');
        allInputs.forEach(item => item.value = '');

        if(index === 0){
            const tableFirstTabs = document.querySelectorAll('.table-tabs .table-tabs_item:first-child');
            tableFirstTabs.forEach(item => {
                item.classList.add('active')
            })
        }else{
            const tableSecondTabs = document.querySelectorAll('.table-tabs .table-tabs_item:last-child');
            tableSecondTabs.forEach(item => {
                item.classList.add('active')
            })
        }
    },

    fillPersonalNumber = () => {
        const firstRowInput = document.querySelector("input[name='0']").value;
        if(firstRowInput !== ''){
            const firstRowInputs = document.querySelectorAll('.form-personal_number input');
            firstRowInputs.forEach(item => item.value = firstRowInput);
            setSuccessToast(true);
        }else{
            setErrorToast(true);
        }
    },

    fillPersonalNumberBackup = () => {
        const firstRowInput = document.querySelector("input[name='backup0']").value;
        if(firstRowInput !== ''){
            const firstRowInputs = document.querySelectorAll('.form-personal_number-backup input');
            firstRowInputs.forEach(item => item.value = firstRowInput);
            setSuccessToast(true);
        }else{
            setErrorToast(true);
        }
    },
    toastClosed = () => {
        setErrorToast(false);
        setSuccessToast(false);
    };
    
    return(
        <div className='container'>
            <div className="form">
                {constraint &&
                    <div className='form-title_wrapper'>
                        <h3 className='form-title'>{constraint.title}</h3>
                        <p className='form-subtitle'>{constraint.question}</p>
                    </div>  
                }
                <div className='table-tabs_container'>
                    {arrayForm?.map((item, index) => {
                        return(
                            <div key={index} className="table-tabs">
                                {item.map((item, index) => {
                                        return(
                                            <div key={index} className="table-tabs_item" onClick={e => selectTab(e, index)}>{item}</div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })}
                </div>
                <div className='form-inner_cols'>
                    <div className='form-inner_space'></div>
                    {innerMostCols?.map((item, index) => {
                        return(
                            <div key={index} className='form-inner'>{item}</div>
                            )
                        })
                    }
                </div>
                <div className='form-inner_buttons'>
                    {innerMostRows?.map((item, index) => {
                        return(
                            <div key={index} className="form-inner_rows">
                                <div className="form-inner_date">{item}</div>
                                <div className='form-personal_number'>
                                    <input name={index}/>
                                </div>
                                <div className='form-personal_number-backup'>
                                    <input name={`backup${index}`}/>
                                </div>
                            </div>
                        )
                    })}
                    <button className='form-personal_number-fill form-inner_button' onClick={(e) => fillPersonalNumber(e.target.value)}>Doldur</button>
                    <button className='form-personal_number-backup_fill form-inner_button' onClick={(e) => fillPersonalNumberBackup(e.target.value)}>Doldur</button>
                </div>
                {errorToast &&
                    <Toast
                        message='Lütfen ilk inputu boş bırakmayınız!'
                        type='error'
                        toastClosed={toastClosed}
                    />
                }
                {successToast &&
                    <Toast
                        message='Tüm alanlar dolduruldu!'
                        type='success'
                        toastClosed={toastClosed}
                    />
                }
            </div>
        </div>
    )
}

export default Form;