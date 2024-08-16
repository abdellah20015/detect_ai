exports.detect = async (text) => {
    // Simuler un temps de traitement
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Retourner une probabilité aléatoire pour la démonstration
    return {
      probability: Math.random() * 100
    };
  };