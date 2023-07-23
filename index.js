const INITIAL_GBP_TO_EUR_EXCHANGE_RATE = 1.16

    ; (() => {
        const amountInputElement = document.getElementById("amount-input")
        const titleInputElement = document.getElementById('title-input')

        const exchangeRateElem = document.getElementById('exchange-rate')
        exchangeRateElem.value = INITIAL_GBP_TO_EUR_EXCHANGE_RATE

        const gbpToEurElement = document.getElementById("eur")
        gbpToEurElement.innerHTML = INITIAL_GBP_TO_EUR_EXCHANGE_RATE

        let transactions = []

        const handleDeleteButtonElementOnClick = (indexToRemove) => {
            const newTransactions = transactions.filter((_, index) => index !== indexToRemove)
            transactions = newTransactions

            handleSumElement()
            renderTable()
        }

        const renderTable = () => {
            const tableElement = document.querySelector("table")

            // REMOVE EXISTING TBODY
            const oldTbodyElement = document.querySelector('tbody')
            if (oldTbodyElement) {
                tableElement.removeChild(oldTbodyElement)
            }

            // CREATE NEW TBODY
            const newTbodyElement = document.createElement("tbody")

            transactions.forEach((transaction, index) => {
                const tdElement1 = document.createElement('td')
                tdElement1.innerText = transaction.title

                const tdElement2 = document.createElement('td')
                tdElement2.innerText = transaction.amount

                const tdElement3 = document.createElement('td')
                tdElement3.innerText = Math.round(transaction.amount * exchangeRateElem.value * 100) / 100

                const deleteButtonElement = document.createElement("button")
                deleteButtonElement.innerText = "Delete"
                deleteButtonElement.onclick = () => handleDeleteButtonElementOnClick(index)

                const tdElement4 = document.createElement('td')
                tdElement4.appendChild(deleteButtonElement)

                const trElement = document.createElement('tr')
                trElement.appendChild(tdElement1)
                trElement.appendChild(tdElement2)
                trElement.appendChild(tdElement3)
                trElement.appendChild(tdElement4)

                newTbodyElement.appendChild(trElement)
            })

            tableElement.appendChild(newTbodyElement)
        }

        const addButtonElement = document.querySelector("button")
        addButtonElement.onclick = () => {
            const transaction = {
                amount: amountInputElement.valueAsNumber,
                title: titleInputElement.value
            }
            transactions.push(transaction)

            titleInputElement.value = ""
            amountInputElement.value = ""

            handleSumElement()
            renderTable()
        }

        const handleSumElement = () => {
            const sum = transactions.map(transaction => transaction.amount).reduce((acc, curr) => acc + curr, 0)

            const sumGbp = document.getElementById("sumgbp")
            sumGbp.innerHTML = sum

            const sumEur = document.getElementById("sumeur")
            sumEur.innerHTML = Math.round(sum * exchangeRateElem.value * 100) / 100
        }

        const handleApplyButtonOnClick = () => {
            gbpToEurElement.innerHTML = exchangeRateElem.value

            handleSumElement()
            renderTable()
        }

        const applyButtonElement = document.getElementById("apply-button")
        applyButtonElement.onclick = handleApplyButtonOnClick
    })()