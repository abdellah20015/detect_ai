document.getElementById('detectionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const textInput = document.getElementById('textInput').value;
    const resultsDiv = document.getElementById('results');
    
    resultsDiv.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Chargement...</span></div></div>';

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Assurez-vous d'avoir un token stocké
            },
            body: JSON.stringify({ text: textInput }),
        });

        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const data = await response.json();

        resultsDiv.innerHTML = `
            <div class="card custom-shadow result-card">
                <div class="card-body">
                    <h5 class="card-title">Résultats de l'analyse</h5>
                    <div class="mb-3">
                        <label class="form-label">Probabilité de plagiat</label>
                        <div class="progress">
                            <div class="progress-bar bg-danger" role="progressbar" style="width: ${data.plagiarismProbability}%;" aria-valuenow="${data.plagiarismProbability}" aria-valuemin="0" aria-valuemax="100">${data.plagiarismProbability}%</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Probabilité de contenu IA</label>
                        <div class="progress">
                            <div class="progress-bar bg-warning" role="progressbar" style="width: ${data.aiProbability}%;" aria-valuenow="${data.aiProbability}" aria-valuemin="0" aria-valuemax="100">${data.aiProbability}%</div>
                        </div>
                    </div>
                    <p class="mt-3"><strong>Informations supplémentaires :</strong> ${data.additionalInfo}</p>
                </div>
            </div>
        `;
    } catch (error) {
        resultsDiv.innerHTML = '<div class="alert alert-danger">Une erreur est survenue lors de l\'analyse. Veuillez réessayer.</div>';
    }
});